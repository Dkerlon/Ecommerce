# 📦 Projeto E-commerce em Vue.js

## 🚀 Tecnologias utilizadas

* **Vue.js** – Framework principal para construção da interface.
* **Pinia** – Gerenciamento de estado global.
* **Vue Router** – Controle das rotas e navegação.
* **Tailwind CSS** – Estilização com utilitários CSS.
* **Firebase** – Utilizado para autenticação e banco de dados em tempo real.

---

## 👥 Tipos de usuários

O sistema possui dois tipos principais de usuários:

* **Comprador**

  * Visualiza produtos disponíveis.
  * Adiciona e remove itens do carrinho.
  * Realiza compras.
  * Avalia produtos comprados.

* **Vendedor**

  * Cadastra novos produtos.
  * Exclui seus próprios produtos.
  * Possui também todas as funcionalidades de um comprador.

---

## ⚙️ Funcionalidades principais

* **Autenticação Firebase**: cadastro, login e controle de sessão.
* **Exposição de produtos**: vendedores podem criar e gerenciar produtos.
* **Listagem de produtos**: todos os usuários podem visualizar os produtos disponíveis.
* **Carrinho de compras**: cada usuário pode adicionar, remover e visualizar itens.
* **Compras**: fluxo de compra integrado, mas nada visual.
* **Avaliações**: compradores podem avaliar os produtos adquiridos.

---

## 📂 Estrutura do projeto

```bash
src/
 ├─ components/    # Componentes reutilizáveis
 ├─ pages/         # Páginas principais
 ├─ router/        # Configuração de rotas com Vue Router
 ├─ store/         # Pinia (estado global)
 ├─ config/        # Configurações (ex: axios, firebase)
 └─ App.vue        # Componente raiz
 └─ Services       # Funções e Classes para requisições https 
```

---

## 🛠️ Instalação e execução

```bash
# Clonar o repositório
git clone <url-do-repo>

# Entrar na pasta
cd ecommerce-vue

# Instalar dependências
npm install

# Rodar em ambiente de desenvolvimento
npm run dev

# Build para produção
npm run build
```

---

## 🔐 Configuração do Firebase

Antes de rodar o projeto, crie um projeto no [Firebase](https://firebase.google.com/), habilite:

* Autenticação (e-mail/senha ou outro provedor)
* Firestore Realtime Database

Crie um arquivo `.env` com suas chaves do Firebase:

```env
VITE_API_KEY=xxxxxx
```

---

## 📌 Roadmap / Possíveis melhorias

* Integração com sistema de pagamento.
* Upload de imagens para produtos.
* Sistema de Chat e Visualização das compras feitas
* Notificações em tempo real para vendedores (novas compras).
* Refatorar estrutura do projeto e desacoplar intefaces de services

---

## 👨‍💻 Autor

Desenvolvido por **Kerlon Aragão** 🧑‍💻
