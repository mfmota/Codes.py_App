import importlib
import sys

scripts = ["CPGEI", "PPGA", "PPGCA", "PPGTA", "PPGEB", "PPGEC", "PPGEF", "PPGEL", "PPGEM", "PPGFA", "PPGPGP", "PPGQ", "PPGSAU", "PPGSE", "PPGTE", "PROFMAT","import_sql"]

def run_script(script_name):
    try:
        module = importlib.import_module(script_name)

        if hasattr(module, 'main'):
            print(f"Executando {script_name}.py")
            module.main()
        else:
            print(f"{script_name}.py não contém uma função main() para executar.")
    except Exception as e:
        print(f"Erro ao executar {script_name}.py: {e}")

if __name__ == "__main__":
    for script in scripts:
        run_script(script)

    #Importar e rodar o import import_sql.py no final
    try:
        sql_module = importlib.import_module('import_sql')

        if hasattr(sql_module, 'main'):
            print("Executando import_sql.py")
            sql_module.main()

        else:
            print("import_sql.py não contém uma função main() para executar")
    except Exception as e:
        print(f"Erro ao executar importação dos dados para o SQL: {e}")