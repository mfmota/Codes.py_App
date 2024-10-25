import pymysql
import os
import csv

# Credenciais do banco de dados
db_config = {
    'host': '172.30.60.59',
    'database': 'dirppg',  # Nome do banco de dados
    'user': 'dirppgApp',
    'password': 'dirppgct',
    'port': 3306  # Porta do MySQL
}

def atualizar_banco_de_dados(diretorio_csv):
    conn = None
    cursor = None
    try:
        # Conectar ao banco de dados
        conn = pymysql.connect(**db_config)
        cursor = conn.cursor()

        # Loop pelos arquivos CSV no diretório especificado
        for filename in os.listdir(diretorio_csv):
            if filename.endswith('.csv'):
                with open(os.path.join(diretorio_csv, filename), mode='r', encoding='utf-8') as csv_file:
                    reader = csv.reader(csv_file, delimiter='¢')
                    next(reader)  # Ignora o cabeçalho

                    for row in reader:
                        # Preparar a consulta de inserção
                        query = """
                        INSERT INTO editais (titulo, link_1, link_2, descricao, atividade, periodo)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        ON DUPLICATE KEY UPDATE 
                            link_1 = VALUES(link_1),
                            link_2 = VALUES(link_2),
                            descricao = VALUES(descricao),
                            atividade = VALUES(atividade),
                            periodo = VALUES(periodo);
                        """
                        cursor.execute(query, row)

        # Commit das transações
        conn.commit()

    except pymysql.Error as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
    except Exception as e:
        print(f"Erro ao atualizar o banco de dados: {e}")
    finally:
        # Fechar o cursor e a conexão se eles foram abertos
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()
            print("Conexão ao bd fechada")

# Defina o diretório onde os arquivos CSV estão localizados
diretorio_csv = r"/home/appdirppg/Documentos/GitHub/dirppg-app-agenda"

# Chama a função para atualizar o banco de dados
atualizar_banco_de_dados(diretorio_csv)
