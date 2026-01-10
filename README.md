# 💳 PayTrack

**PayTrack** é uma aplicação web para **controle de assinaturas e gastos recorrentes**, ajudando usuários a acompanhar cobranças automáticas, evitar gastos esquecidos e ter mais clareza sobre suas finanças pessoais.

Atualmente, muitos serviços funcionam por assinatura, e é comum perder o controle sobre valores, datas de cobrança e serviços que não são mais utilizados. O PayTrack resolve esse problema ao centralizar todas essas informações em um único lugar.

---

## 🎯 Objetivo do Projeto

O PayTrack tem como objetivo permitir que o usuário:

-   Visualize todas as suas assinaturas ativas
-   Saiba quanto está gastando mensal e anualmente
-   Evite cobranças indesejadas por esquecimento
-   Organize gastos por categorias
-   Receba alertas sobre cobranças futuras

Este projeto foi desenvolvido com foco em **boas práticas de desenvolvimento fullstack**, modelagem de dados e regras de negócio realistas, sendo ideal para portfólio.

---

## 🧩 Funcionalidades Principais

### 👤 Usuário

-   Cadastro e autenticação
-   Definição de moeda padrão
-   Ativação ou desativação de notificações

### 📁 Categorias

-   Criação de categorias personalizadas
-   Associação de assinaturas a categorias
-   Organização visual por cores

### 🔁 Assinaturas

-   Cadastro de serviços recorrentes
-   Definição de valor e ciclo de cobrança
-   Controle de status (ativa ou cancelada)
-   Registro da próxima data de cobrança

### 💰 Cobranças

-   Histórico de cobranças por assinatura
-   Controle de status (pendente ou paga)
-   Registro de valores cobrados

### 🔔 Alertas

-   Notificações sobre cobranças próximas
-   Marcação de alertas como lidos

---

## 🧠 Regras de Negócio (Resumo)

-   Cada usuário possui seus próprios dados (categorias, assinaturas e alertas)
-   Uma assinatura pertence obrigatoriamente a um usuário e a uma categoria
-   Cobranças só existem vinculadas a uma assinatura
-   Assinaturas canceladas não geram novas cobranças
-   Exclusões seguem a regra de **cascade** para manter integridade dos dados

---

## 🗂 Estrutura de Dados (Visão Geral)

-   **User**

    -   Categories
    -   Subscriptions
    -   Alerts

-   **Category**

    -   Subscriptions

-   **Subscription**
    -   Charges

Essa estrutura reflete um cenário real de SaaS e foi pensada para facilitar manutenção e escalabilidade.

---

# 🛠 Tecnologias Utilizadas

## 📦 Backend & API

### **Runtime & Framework**

-   **Node.js** - Ambiente de execução JavaScript no servidor
-   **Express.js** - Framework web minimalista e flexível para construção da API

### **Banco de Dados & ORM**

-   **PostgreSQL** - Sistema de banco de dados relacional robusto e confiável
-   **Sequelize** - ORM para Node.js com suporte a PostgreSQL, MySQL, SQLite e MSSQL
-   **pg / pg-hstore** - Drivers PostgreSQL para Node.js

### **Autenticação & Segurança**

-   **bcryptjs** - Biblioteca para hash de senhas com bcrypt
-   **jsonwebtoken** - Implementação de JSON Web Tokens (JWT) para autenticação

### **Documentação & Testes**

-   **swagger-ui-express** - Interface Swagger para documentação interativa da API
-   **supertest** - Biblioteca para testes de integração de APIs HTTP
-   **vitest** - Framework de testes rápido e moderno

### **Configuração & Utilidades**

-   **dotenv** - Gerenciamento de variáveis de ambiente
-   **cors** - Middleware para habilitar CORS (Cross-Origin Resource Sharing)

## 🏗 Arquitetura & Padrões

### **Padrão MVC (Model-View-Controller)**

-   **Models** - Definição de entidades e relacionamentos com Sequelize
-   **Controllers** - Lógica de tratamento de requisições e respostas
-   **Services** - Regras de negócio e validações
-   **Repositories** - Camada de acesso a dados

### **Design Patterns Implementados**

-   **Repository Pattern** - Isolamento da lógica de acesso a dados
-   **Service Layer** - Separação clara das regras de negócio
-   **Middleware Pattern** - Processamento modular de requisições
-   **Error Handling** - Tratamento centralizado de erros

## 🗂 Estrutura de Projeto

```
paytrack-api/
├── src/
│   ├── config/          # Configurações (banco, ambiente)
│   ├── controllers/     # Controladores das rotas
│   ├── helpers/         # Utilitários e classes de erro
│   ├── middlewares/     # Middlewares (autenticação, validação)
│   ├── models/          # Modelos do Sequelize
│   ├── repositories/    # Camada de acesso a dados
│   ├── routes/          # Definição de rotas
│   ├── services/        # Regras de negócio
│   └── swagger.js       # Documentação Swagger
├── tests/
│   └── e2e/             # Testes end-to-end
├── .env.example         # Variáveis de ambiente exemplo
├── package.json         # Dependências e scripts
└── README.md            # Documentação do projeto
```

## 🔧 Ferramentas de Desenvolvimento

### **Gerenciamento de Dependências**

-   **npm** - Gerenciador de pacotes do Node.js

### **Testes**

-   **Testes E2E** - Testes completos de ponta a ponta
-   **Testes de Integração** - Validação de endpoints da API
-   **Suíte de Testes** - Cobertura de casos de sucesso e erro

### **Documentação**

-   **OpenAPI 3.0** - Especificação para documentação da API
-   **Swagger UI** - Interface interativa para testar endpoints

## 🚀 Práticas Adotadas

### **Boas Práticas de Código**

-   Código modular e reutilizável
-   Separação clara de responsabilidades
-   Tratamento adequado de erros
-   Validações de entrada robustas

### **Segurança**

-   Autenticação via JWT
-   Hash de senhas com bcrypt
-   Proteção contra SQL Injection (via Sequelize)
-   Headers de segurança configurados

### **Qualidade de Código**

-   Testes automatizados
-   Documentação completa
-   Padrões de commit semânticos
-   Estrutura consistente de projeto

## 📈 Escalabilidade & Manutenibilidade

### **Design para Escala**

-   Conexões otimizadas com banco de dados
-   Queries eficientes através do Sequelize
-   Cache ready (estrutura preparada para implementação)

### **Facilidade de Manutenção**

-   Configuração por ambiente
-   Logs estruturados
-   Migrações de banco de dados
-   Versionamento de API

---

**Esta stack foi escolhida por oferecer um equilíbrio entre produtividade, performance e manutenibilidade, sendo ideal para projetos que necessitam de robustez e escalabilidade.**

## 👨‍💻 Autor

**Fellipe da Silva Castro**  
Desenvolvedor Fullstack  
Projeto desenvolvido para estudo e portfólio
