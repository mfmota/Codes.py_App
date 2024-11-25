import requests
import os
import csv
from pathlib import Path

API_URL_EDITAIS = "http://172.30.60.55:3030/editais"
API_URL_ASSOCIACAO = "http://172.30.60.55:3030/nucleos_editais"
API_URL_NUCLEOS = "http://172.30.60.55:3030/nucleos/:nome"

diretorio_csv = Path('csv') 

def atualizar_banco_de_dados():
    for filename in os.listdir(diretorio_csv):
        if filename.endswith('.csv'):
            arquivo_path = Path(filename)
            nucleo_nome = arquivo_path.stem

            with open(diretorio_csv / filename, mode='r', encoding='utf-8-sig') as csv_file:
                reader = csv.DictReader(csv_file, delimiter='¢')

                for row in reader:
                    print("Row content:", row) 
                    dados = {
                        "nucleo": nucleo_nome,
                        "titulo": row.get('Título', '').strip(),
                        "link1": row.get('Link 1', '').strip(),
                        "link2": row.get('Link 2', '').strip(),
                        "descricao": row.get('Descrição', '').strip(),
                    }

                    try:
                        edital = requests.post(API_URL_EDITAIS, json=dados)
                        if edital.status_code == 201:
                            print(f"Edital cadastrado: {dados['titulo']}")

                            nucleo = requests.get(API_URL_NUCLEOS.replace(':nome', nucleo_nome))
                            nucleo_data = nucleo.json()

                            if 'nucleo' in nucleo_data:
                                nucleo_id = nucleo_data['nucleo']['id']
                                edital_data = edital.json()
                                edital_id = edital_data['dadosEditais']['id']

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
                        else:
                            print(f"Erro ao cadastrar edital: {edital.status_code} - {edital.text}")
                    except requests.RequestException as e:
                        print(f"Erro de conexão com a API: {e}")

def main():
    atualizar_banco_de_dados()

#if __name__ == '__main__':
#    main()
