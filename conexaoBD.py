import requests

try:
    response = requests.get("http://172.30.60.55:3030/nucleos/dirppg")
    if response.status_code == 200:
        print("Conexão bem-sucedida com a API!")
    else:
        print(f"Erro: {response.status_code}")
except requests.RequestException as e:
    print(f"Erro de conexão com a API: {e}")
