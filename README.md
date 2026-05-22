# Paytrack - Desafio Técnico

Projeto em **Node.js** que consome a API [RandomUser](https://randomuser.me), salva os dados em **SQLite** e gera um relatório de processamento.

---

## O que foi realizado
- Busca 150 usuários da API RandomUser.
- Salva no banco SQLite (`users.db`).
- Usa o campo `email` como chave única.
- Atualiza registros existentes e adiciona novos.
- Ignora usuários menores de 18 anos (`dob.age`).
- Gera relatório (`report.txt`) com resumo do processamento e mostra no console.

---

## Instalação

1. Clone o repositório:
 ```bash
git clone https://github.com/seuusuario/paytrack-desafio.git
cd paytrack-desafio
 ```  
2. Instale as dependências:

```bash
npm install
```
Dependências
axios → consumo da API
sqlite e sqlite3 → banco de dados

3. Como rodar
```bash
node index.js
```
Durante a execução:

- Usuários são buscados da API.

- Apenas maiores de 18 anos são persistidos.

- O relatório é salvo em report.txt e exibido no console.
