# 📋 Deploy automático - Gerenciador de Tarefas

Aplicação web para gerenciamento de tarefas com **deploy automatizado**, **análise de código via SonarQube**, e publicação contínua de imagens no **Docker Hub**.

---


## 🚀 Tecnologias Utilizadas

- **Front-end**: HTML, CSS E JS
- **Back-end**: Node.js (Express)
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker & Docker Compose
- **Repositório de Imagens**: Docker Hub
- **CI/CD**: GitHub Actions
- **Análise de Código**: SonarQube

---

## Comandos para rodar a aplicação localmente:

1º docker pull willmonteiro/gerenciador-tarefas:04

2º docker run -d -p 8048:3000 willmonteiro/gerenciador-tarefas:04

3º docker compose up -d

4º Abrir o navegador e digitar: http://localhost:8248/


## Aplicação rodando em containers diferentes

![Image](https://github.com/user-attachments/assets/839c06c0-a705-450e-a07c-92406ffb3756)

## Repositório ativo no Docker hub

![Image](https://github.com/user-attachments/assets/b864e707-5bfe-4ee1-ad3a-b314330f85c4)

## Imagem da aplicação rodando localmente

![Image](https://github.com/user-attachments/assets/0605157d-1ef8-46ef-9530-7d76a9165459)

Análise de erros:

1º Falta de memória no servidor. 
Solução: problema solucionado pelo professor.

2º Tentativa de desconpactar o Sonarqueb para a Análise do Sonar Scanner.
Solução: Como não foi possível instalar o Unzip por falta de permissão de sudo,
a outra opção foi fazer fazer a inicialização via API.

3º Banco de dados não funcionou depois do Deploy
Solução, sem solução, porém muitas tentativas, muitas mesmo, foram realizadas, buscando encontrar algum
erro entre variáveis de ambiente.


## Aplicação disponível em:
http://201.23.3.86:8248/



