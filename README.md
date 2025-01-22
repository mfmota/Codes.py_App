# Extração e Gerenciamento de Editais da UTFPR

Este projeto automatiza a extração, verificação, cadastro e atualização de editais da UTFPR para utilização no aplicativo módel, códigos disponíveis nos repositórios Back_App e Front_App, utilizando web scraping e integração com uma API RESTful.

## Estrutura do Projeto

- **`main.py`**  
  Arquivo principal que gerencia a execução do processo de extração para múltiplos núcleos.

- **`extrair_editais.py`**  
  Responsável pela extração de dados dos editais diretamente do site da UTFPR. Utiliza técnicas de web scraping com BeautifulSoup para capturar informações como título, descrição, links e prazos.

- **`import_sql.py`**  
  Contém funções para interação com a API RESTful, incluindo o cadastro e atualização de editais, associação de núcleos e editais, além do registro de prazos.

## Funcionalidades

1. **Extração de Editais**  
   O script acessa as páginas dos núcleos acadêmicos da UTFPR, identifica editais, extrai suas informações e verifica se pertencem ao ano corrente ou ao próximo.

2. **Cadastro e Atualização de Editais**  
   - Verifica se um edital já existe na API antes de cadastrá-lo.  
   - Atualiza editais desatualizados com base na data de modificação no site oficial.

3. **Associação de Núcleos e Registro de Prazos**  
   - Associa cada edital ao núcleo correspondente.  
   - Registra prazos específicos extraídos diretamente das tabelas nos editais.

4. **Execução em Massa**  
   O `main.py` percorre uma lista de núcleos pré-configurada para automatizar o processo.

## Como Utilizar

1. Clone o repositório para sua máquina local.
2. Certifique-se de ter o Python 3 instalado.
3. Instale as dependências necessárias:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure o endpoint da API no arquivo `import_sql.py`:
   - **API_URL_EDITAIS**: URL para cadastro de editais.  
   - **API_URL_ASSOCIACAO**: URL para associar núcleos e editais.  
   - **API_URL_NUCLEOS**: URL para buscar núcleos.  
   - **API_URL_PRAZOS**: URL para registro de prazos.  
   - **API_URL_EDITAIS_BUSCAR**: URL para verificar se um edital já está cadastrado.  

5. Execute o script principal:
   ```bash
   python main.py
   ```

## Dependências

As bibliotecas utilizadas neste projeto incluem:

- `requests`: Para realizar requisições HTTP.  
- `beautifulsoup4`: Para realizar o web scraping.  
- `urllib3`: Para gerenciar conexões HTTP com certificados SSL.  

Instale as dependências utilizando o comando:
```bash
pip install requests beautifulsoup4 urllib3
```

## Configuração da API

A API deve estar configurada e acessível para que os scripts possam registrar e atualizar editais, criar associações e salvar prazos. Verifique os endpoints no arquivo `import_sql.py` antes de executar.

## Observações

- Certifique-se de que as páginas dos núcleos da UTFPR estejam acessíveis antes de iniciar o processo.
- O script suporta apenas editais relacionados ao ano atual e ao próximo.
- Em caso de alterações no layout do site da UTFPR, pode ser necessário ajustar os seletores do BeautifulSoup.

## Autor

Este projeto foi desenvolvido por **Maria Fernanda**, estudante de Sistemas de Informação na UTFPR, com foco em automação e integração de sistemas.

