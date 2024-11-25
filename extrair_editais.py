import requests
from bs4 import BeautifulSoup
import csv
import os
import re
from pathlib import Path
import urllib3
from datetime import datetime


urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def extrair_editais(url_base: str, nucleo: str, csv_filename: str):
    url = f"{url_base}/{nucleo}/editais"
    response = requests.get(url, verify=False)
    ano = datetime.now().year

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        editais_data = []
        listings = soup.find_all('div', class_='listing-item')

        for listing in listings:
            titulo_tag = listing.find('h3', class_='text-dsGray-900')
            if titulo_tag:
                titulo = titulo_tag.get_text(strip=True)

                if ano:
                    data_publicacao_tag = listing.find(string=re.compile(r"Curitiba, \d{1,2} de \w+ de \d{4}"))
                    if data_publicacao_tag:
                        data_publicacao = data_publicacao_tag.strip()
                        match = re.search(r"(\d{4})", data_publicacao)
                        if match:
                            ano_data_publicacao = match.group(1)
                            if ano and ano != int(ano_data_publicacao):
                                continue 
            
                descricao_tag = titulo_tag.find_next_sibling()
                descricao = descricao_tag.get_text(strip=True) if descricao_tag else "Descrição resumida não encontrada"

                link_tag = listing.find('a')
                if link_tag:
                    link_edital_principal = url_base + link_tag['href']
                    response_edital = requests.get(link_edital_principal, verify=False)
                    if response_edital.status_code == 200:
                        soup_edital = BeautifulSoup(response_edital.content, 'html.parser')

                        link_final_tag = soup_edital.find('a', class_="text-[#0169CD]")
                        link_edital_final = link_final_tag['href'] if link_final_tag else 'Link final não encontrado'

                        if link_edital_final.startswith('/'):
                            link_edital_final = "https://sei.utfpr.edu.br" + link_edital_final

                        editais_data.append([titulo, link_edital_principal, link_edital_final, descricao])
                    else:
                        print(f"Falha ao acessar o edital principal: {link_edital_principal}")
                        editais_data.append([titulo, link_edital_principal, 'Link final não encontrado', 'Falha ao acessar o edital principal'])

        diretorio_csv = Path('csv')
        diretorio_csv.mkdir(exist_ok=True)
        output_filename = os.path.join(diretorio_csv, csv_filename)
        file_exists = os.path.isfile(output_filename)

        with open(output_filename, mode='a', newline='', encoding='utf-8-sig') as file:
            writer = csv.writer(file, delimiter='¢')
            if not file_exists:
                writer.writerow(['Título', 'Link 1', 'Link 2', 'Descrição'])

            existing_data = set()
            if file_exists:
                with open(output_filename, mode='r', newline='', encoding='utf-8') as read_file:
                    reader = csv.reader(read_file, delimiter='¢')
                    existing_data = {tuple(row) for row in reader}

            for edital in editais_data:
                if tuple(edital) not in existing_data:
                    writer.writerow(edital)

        print(f"Dados extraídos e salvos/atualizados em '{output_filename}' com sucesso!")
    else:
        print(f"Falha ao acessar a página: {url}")