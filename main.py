from extrair_editais import extrair_editais

url_base = "https://www.utfpr.edu.br/cursos/coordenacoes/stricto-sensu"

scripts = ["CPGEI", "PPGA", "PPGCA", "PPGEB", "PPGEC", "PPGEF", "PPGEL", "PPGEM", "PPGFA", "PPGPGP", "PPGQ", "PPGSAU", "PPGSE", "PPGTE", "PROFMAT","import_sql"]

def main():
    for script in scripts:
        nucleo = f"{script.lower()}-ct"
        try:
            print(f"Executando extração para o núcleo: {nucleo}")
            extrair_editais(url_base, nucleo,script)
        except Exception as e:
            print(f"Erro ao processar o núcleo {nucleo}: {e}")

if __name__ == "__main__":
    main()