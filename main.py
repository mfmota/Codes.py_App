from extrair_editais import extrair_editais

url_base = "https://www.utfpr.edu.br/cursos/coordenacoes/stricto-sensu"

scripts = ["CPGEI", "PPGA", "PPGCA", "PPGEB", "PPGEC", "PPGEF", "PPGEL", "PPGEM", "PPGFA", "PPGPGP", "PPGQ", "PPGSAU", "PPGSE", "PPGTE", "PROFMAT","import_sql"]

def main():
    for script in scripts:
        nucleo = f"{script.lower()}-ct"
        csv_filename = f"{script}.csv"

        try:
            print(f"Executando extração para o núcleo: {nucleo}, arquivo: {csv_filename}")
            extrair_editais(url_base, nucleo, csv_filename)
        except Exception as e:
            print(f"Erro ao processar o núcleo {nucleo}: {e}")

    try:
        import import_sql
        if hasattr(import_sql, 'main'):
            print("Executando import_sql.py")
            import_sql.main()
        else:
            print("import_sql.py não contém uma função main() para executar")
    except Exception as e:
            print(f"Erro ao executar importação dos dados para o SQL: {e}")

if __name__ == "__main__":
    main()