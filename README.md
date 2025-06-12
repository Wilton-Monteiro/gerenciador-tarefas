# 📋 Gerenciador de Tarefas

Aplicação web para gerenciamento de tarefas com **deploy automatizado**, **análise de código via SonarQube**, e publicação contínua de imagens no **Docker Hub**.

---

## 🚀 Tecnologias Utilizadas

- **Front-end**: React.js
- **Back-end**: Node.js (Express)
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker & Docker Compose
- **Repositório de Imagens**: Docker Hub
- **CI/CD**: GitHub Actions
- **Análise de Código**: SonarQube

---

## 🗂️ Estrutura do Projeto

gerenciador-tarefas/
├── .github/workflows/
│ └── deploy.yml # Pipeline CI/CD do GitHub Actions
├── back-end/
│ ├── controllers/
│ │ └── tarefasController.js
│ ├── node_modules/
│ ├── db.js # Conexão com o banco
│ ├── index.js # Arquivo principal da API
│ ├── init.sql # Script de criação da tabela
│ ├── package.json
│ └── routes.js # Rotas da API
├── front-end/
│ ├── index.html
│ ├── index.js
│ └── styles.css
├── init.sql # Script SQL global
├── dockerfile # Dockerfile da aplicação
├── docker-compose.yml # Orquestração com Docker Compose
├── sonar-project.properties # Configuração da análise SonarQube
└── README.md

## 🚀 Tecnologias Utilizadas

- **Front-end**: HTML, CSS E JS
- **Back-end**: Node.js (Express)
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker & Docker Compose
- **Repositório de Imagens**: Docker Hub
- **CI/CD**: GitHub Actions
- **Análise de Código**: SonarQube

---






