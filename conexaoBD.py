import mysql.connector
from mysql.connector import Error

# Credenciais do banco de dados MySQL
db_config = {
    'host': '172.30.60.55',
    'database': 'appDirppg',
    'user': 'dirppgApp',
    'password': 'dirppgct',
}

def testar_conexao():
    conn = None
    try:
        # Tentativa de conexão com o banco de dados
        conn = mysql.connector.connect(**db_config)
        if conn.is_connected():
            print("Conexão estabelecida com sucesso!")
    except Error as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
    finally:
        # Fechar a conexão se foi aberta
        if conn is not None and conn.is_connected():
            conn.close()
            print("Conexão fechada.")

# Testar a conexão
testar_conexao()
