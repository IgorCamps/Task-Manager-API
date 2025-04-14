# 🧠 Task Manager API - Back-end com TypeScript, Express e PostgreSQL

API RESTful desenvolvida com Node.js, Express, TypeScript e PostgreSQL para gerenciamento de usuários e tarefas. Inclui autenticação com JWT e arquitetura limpa, pronta para produção.

## 🚀 Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- Docker
- JWT
- Bcrypt
- Dotenv

## 📦 Instalação

```bash
git clone https://github.com/IgorCamps/task-manager-api.git
cd task-manager-api
npm install
```

## ⚙️ Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=admin
DB_NAME=taskmanager
JWT_SECRET=secreta_super_segura
```

## 🐘 Banco de dados com Docker

```bash
docker run --name postgres-db -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=taskmanager -p 5432:5432 -d postgres
```

## 🚀 Rodando a aplicação

```bash
npm run dev
```

A API estará disponível em: `http://localhost:3000`

## 📚 Rotas disponíveis

### ✅ Usuários

- `POST /users`: Criar novo usuário
- `POST /login`: Fazer login e receber token JWT

### ✅ Tarefas (após autenticação)

- `GET /tasks`: Listar tarefas do usuário
- `POST /tasks`: Criar nova tarefa
- `PUT /tasks/:id`: Atualizar tarefa
- `DELETE /tasks/:id`: Remover tarefa

## 🔐 Autenticação

Utilize o token JWT retornado no login para acessar as rotas protegidas.  
Envie o token no header:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

## 📁 Estrutura de pastas

```bash
src/
├── controllers/
├── entities/
├── routes/
├── middlewares/
├── data-source.ts
├── index.ts
```

## 🧪 Testes com Insomnia/Postman

Inclui collections para facilitar o teste das rotas (você pode importar no Insomnia).
