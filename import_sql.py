from urllib import response
import requests
from pathlib import Path

API_URL_EDITAIS = "http://172.30.60.58:3030/editais"
API_URL_ASSOCIACAO = "http://172.30.60.58:3030/nucleos_editais"
API_URL_NUCLEOS = "http://172.30.60.58:3030/nucleos/:nome"
API_URL_PRAZOS = "http://172.30.60.58:3030/prazos"
API_URL_EDITAIS_BUSCAR = "http://172.30.60.58:3030/editais/link"

diretorio_csv = Path('csv') 

def verificar_edital_existente(titulo:str) -> bool:
    try:
        response = requests.get(API_URL_EDITAIS_BUSCAR,params={"titulo": titulo})
        if response.status_code == 200:
            return True
        elif response.status_code == 404:
            return False
        else:
            print(f"Erro ao verificar edital: {response.status_code} - {response.text}")
            return False  
    except requests.RequestException as e:
        print(f"Erro de conexão ao verificar edital: {e}")
        return False

def atualizar_banco_de_dados(dados_edital,prazos=None):
   
    try:
        edital = requests.post(API_URL_EDITAIS, json=dados_edital)
        print(f"Tentativa de cadastro do edital {dados_edital['titulo']} - Status: {edital.status_code}, Resposta: {edital.text}")

        if edital.status_code != 201:
            print(f"Erro ao cadastrar edital: {edital.status_code} - {edital.text}")
            return
        if edital.status_code == 201:
            print(f"Edital cadastrado: {dados_edital['titulo']}")
            edital_data = edital.json()
            edital_id = edital_data['dadosEditais']['id']

            nucleo_nome = dados_edital['nucleo']
            nucleo = requests.get(API_URL_NUCLEOS.replace(':nome', nucleo_nome))
            nucleo_data = nucleo.json()

            if 'nucleo' in nucleo_data:
                nucleo_id = nucleo_data['nucleo']['id']
                associacao_dados = {
                    "nucleo_id": nucleo_id,
                    "edital_id": edital_id
                }
                response_associacao = requests.post(API_URL_ASSOCIACAO, json=associacao_dados)

                if response_associacao.status_code == 201:
                    print(f"Associação criada para o núcleo: {nucleo_nome}")
                else:
                    print(f"Erro ao criar associação: {response_associacao.status_code} - {response_associacao.text}")
            else:
                print(f"Núcleo não encontrado: {nucleo_nome}")

            if prazos:
                for prazo in prazos: 
                    try:
                        descricao, data = prazo.split('¢')
                        prazo_dados = {
                            "id_edital": edital_id,
                            "descricao": descricao,
                            "data": data,
                        }
                        response_prazo = requests.post(API_URL_PRAZOS, json=prazo_dados)
                        if response_prazo.status_code == 201:
                            print(f"Prazo cadastrado: {prazo_dados['descricao']} ({prazo_dados['data']})")
                        else:
                            print(f"Erro ao salvar prazo: {response_prazo.status_code} - {response_prazo.text}")
                    except ValueError:
                        print(f"Formato de prazo inválido: {prazo}")
            else:
                print(f"Sem prazos")
    except requests.RequestException as e:
        print(f"Erro de conexão com a API: {e}")

def main():
    atualizar_banco_de_dados()

#if __name__ == '__main__':
#    main()
