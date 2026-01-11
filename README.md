# SmartMart - Sistema de Gerenciamento de Produtos

Sistema completo para gerenciamento de produtos, categorias e histórico de vendas de uma loja.

## 🛠️ Tecnologias

### Backend
- **Python 3.12**
- **Flask 3.1.2** - Framework web
- **Flask-SQLAlchemy 3.1.1** - ORM
- **Flask-Cors 6.0.2** - CORS
- **PostgreSQL 17** - Banco de dados
- **psycopg 3.3.2** - Driver PostgreSQL
- **pandas 2.3.3** - Manipulação de dados CSV
- **python-dotenv 1.2.1** - Variável de ambiente

### Frontend
- **Next.js 16.1.1**
- **React 19.2.3**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Shadcn UI**
- **React Hook Form + Zod**

## 🗄️ Modelo de Dados

### Category
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Integer | Chave primária |
| name | String(100) | Nome da categoria |

### Product
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Integer | Chave primária |
| name | String(100) | Nome do produto |
| description | Text | Descrição |
| price | Float | Preço |
| brand | String(50) | Marca |
| category_id | Integer | FK para Category |

### Sale
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Integer | Chave primária |
| product_id | Integer | FK para Product |
| quantity | Integer | Quantidade vendida |
| total_price | Float | Valor total |
| date | DateTime | Data da venda |

## 🔌 API Endpoints

### Categorias
- `GET /api/categories/list` - Listar todas
- `POST /api/categories/create` - Criar
- `GET /api/categories/:id` - Buscar por ID
- `PUT /api/categories/update/:id` - Atualizar
- `DELETE /api/categories/delete/:id` - Deletar

### Produtos
- `GET /api/products/list` - Listar com paginação
- `POST /api/products/create` - Criar
- `GET /api/products/:id` - Buscar por ID
- `PUT /api/products/update/:id` - Atualizar
- `DELETE /api/products/delete/:id` - Deletar

**Query params disponíveis:**
- `page` - Página atual
- `size` - Itens por página

### Vendas
- `GET /api/sales/list` - Listar com paginação
- `POST /api/sales/create` - Criar
- `GET /api/sales/:id` - Buscar por ID
- `DELETE /api/sales/delete/:id` - Deletar
- `GET /api/sales/stats` - Estatísticas

### Importação CSV
- `POST /api/import/categories` - Importar categorias
- `POST /api/import/products` - Importar produtos
- `POST /api/import/sales` - Importar vendas

## 🚀 Como Executar

### Pré-requisitos
- Python 3.12+
- Node.js 20+
- Docker e Docker Compose

### Backend

```bash
cd backend

# Iniciar PostgreSQL
docker compose up -d

# Criar ambiente virtual
python -m venv .venv
source .venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env-example .env
# Editar .env com suas credenciais

# Executar
python -m flask --app app run
```

### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

Acesse:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📦 Formato CSV para Importação

### categories.csv
```csv
id
name
```

### products.csv
```csv
id
name
description
price
brand
category_id
```

### sales.csv
```csv
id
product_id
quantity
total_price
date
```

## ✨ Funcionalidades

- ✅ CRUD completo de produtos, categorias e vendas
- ✅ Paginação server-side
- ✅ Importação em massa via CSV
- ✅ Histórico de vendas
- ✅ Interface responsiva
- ✅ Notificações toast
- ✅ Cache com revalidação automática
