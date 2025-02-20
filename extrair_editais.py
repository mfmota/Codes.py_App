import requests
from bs4 import BeautifulSoup
import re
from pathlib import Path
import urllib3
from datetime import datetime
from import_sql import atualizar_banco_de_dados, verificar_edital_existente

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def extrair_editais(url_base: str, nucleo: str,script):
    url = f"{url_base}/{nucleo}/editais"
    response = requests.get(url, verify=False)
    ano_atual = datetime.now().year
    ano_proximo = ano_atual + 1

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        listings = soup.find_all('div', class_='listing-item')

        for listing in listings:
            titulo_tag = listing.find('h3', class_='text-dsGray-900')
            if titulo_tag:
                titulo = titulo_tag.get_text(strip=True)
                ano_titulo = None
                match = re.search(r"\d{4}",titulo)
                if match:
                    ano_titulo = int(match.group(0))
                if ano_titulo is not None and (ano_titulo != ano_atual and ano_titulo != ano_proximo):   
                    continue

                descricao_tag = titulo_tag.find_next_sibling()
                descricao = descricao_tag.get_text(strip=True) if descricao_tag else "Descrição resumida não encontrada"

                link_tag = listing.find('a')

                if link_tag:
                    link_edital_principal = url_base + link_tag['href']

                    if verificar_edital_existente(titulo):
                        print(f"Edital já existe: {titulo}, verificando ultima modificação")
                        response_edital = requests.get(link_edital_principal, verify=False)

                        if response_edital.status_code == 200:

                            soup_edital = BeautifulSoup(response_edital.content, 'html.parser')

                            div_tag = soup_edital.find('div', class_='text-[13px] text-[#7A7A7A]')
                            if div_tag:
                                text = div_tag.get_text()
                                if "última modificação" in text:
                                    data_str = text.split("última modificação")[-1].strip().split(',')[0].strip()
                                    try:
                                        data_mod = datetime.strptime(data_str, "%m/%d/%Y")
                                        if data_mod.year != ano_atual:
                                            atualizado = True
                                            continue 
                                    except ValueError:
                                        print("Erro no formato da data:", data_str)
                        if atualizado:
                            continue
                    else:
                        print(f"Edital não encontrado, prosseguindo com cadastro: {titulo}")
                        
                    response_edital = requests.get(link_edital_principal, verify=False)

                    if response_edital.status_code == 200:

                        soup_edital = BeautifulSoup(response_edital.content, 'html.parser')

                        link_final_tag = soup_edital.find('a', class_="text-[#0169CD]")
                        link_edital_final = link_final_tag['href'] if link_final_tag else 'Link final não encontrado'

                        if link_edital_final.startswith('/'):
                            link_edital_final = "https://sei.utfpr.edu.br" + link_edital_final
                        
                        dados_edital = {
                            "nucleo":script,
                            "titulo":titulo,
                            "descricao":descricao,
                            "link1":link_edital_principal,
                            "link2":link_edital_final
                        }
                        try:
                            response_edital_final = requests.get(link_edital_final, verify=False)
                            print(response_edital_final)
                            if response_edital_final.status_code == 200:

                                soup_edital_final = BeautifulSoup(response_edital_final.content, 'html.parser')

                                cronograma_regex = re.compile(r"cronograma", re.IGNORECASE)
                                paragrafos_edital = soup_edital_final.find_all('p')

                                descricao_prazos_concatenados = []
                            
                                for p in paragrafos_edital:
                                    texto = p.get_text(strip=True)
                                    cronograma_match = cronograma_regex.search(texto)

                                    if cronograma_match:
                                        tabela = p.find_next('table')
                                        if tabela:
                                            linhas = tabela.find_all('tr')
                                            if not linhas:  
                                                continue

                                            primeira_linha = linhas[0]
                                            colunas_primeira_linha = [col.get_text(strip=True).lower() for col in primeira_linha.find_all('td')]
                                            palavras_chave = ['data', 'período']

                                            if not any(palavra in coluna for palavra in palavras_chave for coluna in colunas_primeira_linha):
                                                continue
                                            
                                            
                                            if len(linhas) > 1:
                                                primeira_coluna_segunda_linha = linhas[1].find_all('td')[0].get_text(strip=True)
                                                try:
                                                    primeira_coluna_segunda_linha_float = float(primeira_coluna_segunda_linha)
                                                except:
                                                    primeira_coluna_segunda_linha_float = 0
                                            for linha in linhas[1:]:

                                                colunas = linha.find_all('td')
                                                
                                                if len(colunas) >= 3 and primeira_coluna_segunda_linha_float >= 1.0:
                                                    descricao_tabela = colunas[1].get_text(strip=True)
                                                    data_prazo = colunas[2].get_text(strip=True)
                                                    descricao_prazos_concatenados.append(f"{descricao_tabela}¢{data_prazo}")
                                                
                                                elif len(colunas) >= 2:
                                                    descricao_tabela = colunas[0].get_text(strip=True)
                                                    data_prazo = colunas[1].get_text(strip=True)
                                                    descricao_prazos_concatenados.append(f"{descricao_tabela}¢{data_prazo}")
                                if descricao_prazos_concatenados:
                                    atualizar_banco_de_dados(dados_edital,descricao_prazos_concatenados) 
                                else:
                                    atualizar_banco_de_dados(dados_edital,prazos=None) 

                                print(f"Dados extraídos e salvos/atualizados com sucesso!")

                            else:
                                print(f"Falha ao acessar o link final do edital: {link_edital_final}")

                        except requests.exceptions.RequestException as e:
                            print(f"Erro ao acessar o link final do edital: {link_edital_final} - {e}")   
                    else:
                        print(f"Falha ao acessar o edital principal: {link_edital_principal}")
    else:
        print(f"Falha ao acessar a página: {url}")