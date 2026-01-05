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

## 🏗 Arquitetura

O projeto segue uma arquitetura organizada e escalável, baseada em:

-   Separação clara de responsabilidades
-   Camada de models para persistência de dados
-   Relacionamentos bem definidos no banco de dados
-   Preparação para expansão com services e controllers

---

## 🚀 Status do Projeto

🔧 **Em desenvolvimento (MVP)**  
As funcionalidades principais estão sendo implementadas com foco em estabilidade e clareza das regras de negócio.

---

## 📌 Próximos Passos

-   Finalização da API
-   Implementação de autenticação segura
-   Dashboard com resumo financeiro
-   Filtros por período e categoria
-   Interface web para gerenciamento das assinaturas

---

## 👨‍💻 Autor

**Fellipe da Silva Castro**  
Desenvolvedor Fullstack  
Projeto desenvolvido para estudo e portfólio
