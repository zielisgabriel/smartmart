# SmartMart - Sistema de Gerenciamento de Produtos

Sistema completo para gerenciamento de produtos, categorias e histórico de vendas de uma loja.

## 🛠️ Tecnologias

### Backend
- **Python 3.12**
- **Flask 3.1.2** - Framework web
- **Flask-SQLAlchemy 3.1.1** - ORM
- **PostgreSQL 17** - Banco de dados
- **psycopg 3.3.2** - Driver PostgreSQL
- **pandas 2.3.3** - Manipulação de dados CSV

### Frontend
- **Next.js 16.1.1** - Framework React
- **React 19.2.3**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Radix UI** - Componentes acessíveis
- **React Hook Form + Zod** - Formulários e validação
- **Sonner** - Notificações toast

## 📁 Estrutura do Projeto

```
smartmart-product-management/
├── backend/
│   ├── app.py                 # Aplicação Flask
│   ├── config.py              # Configurações do banco
│   ├── database.py            # Instância SQLAlchemy
│   ├── docker-compose.yml     # PostgreSQL container
│   ├── requirements.txt       # Dependências Python
│   ├── entities/              # Modelos do banco
│   │   ├── category.py
│   │   ├── product.py
│   │   └── sale.py
│   ├── repositories/          # Camada de dados
│   │   ├── category_repository.py
│   │   ├── product_repository.py
│   │   └── sale_repository.py
│   ├── usecases/              # Regras de negócio
│   │   ├── category_usecases.py
│   │   ├── product_usecases.py
│   │   ├── sale_usecases.py
│   │   └── import_usecases.py
│   ├── controllers/           # Controladores HTTP
│   │   ├── category_controller.py
│   │   ├── product_controller.py
│   │   ├── sale_controller.py
│   │   └── import_controller.py
│   └── routes/                # Rotas da API
│       ├── category_routes.py
│       ├── product_routes.py
│       ├── sale_routes.py
│       └── import_routes.py
│
└── frontend/
    └── src/
        ├── app/
        │   ├── layout.tsx
        │   ├── page.tsx           # Página de produtos
        │   └── sales/
        │       └── page.tsx       # Página de vendas
        ├── components/
        │   ├── product-list.tsx
        │   ├── sales-list.tsx
        │   ├── add-product-modal.tsx
        │   ├── edit-product-modal.tsx
        │   ├── delete-product-dialog.tsx
        │   ├── import-categories-modal.tsx
        │   ├── import-products-modal.tsx
        │   ├── import-sales-history-modal.tsx
        │   ├── pagination.tsx
        │   ├── search-product.tsx
        │   ├── product-filters.tsx
        │   └── ui/                # Componentes shadcn/ui
        ├── actions/               # Server Actions
        │   ├── product-actions.ts
        │   ├── category-actions.ts
        │   ├── sale-actions.ts
        │   └── import-actions.ts
        ├── services/              # Serviços com cache
        │   ├── get-products-service.ts
        │   ├── get-categories-service.ts
        │   └── get-sales-service.ts
        └── types/                 # Tipos TypeScript
            ├── product.d.ts
            ├── category.d.ts
            ├── sale.d.ts
            └── pageable.d.ts
```

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
- `GET /api/categories` - Listar todas
- `POST /api/categories` - Criar
- `GET /api/categories/:id` - Buscar por ID
- `PUT /api/categories/:id` - Atualizar
- `DELETE /api/categories/:id` - Deletar

### Produtos
- `GET /api/products` - Listar com paginação
- `POST /api/products` - Criar
- `GET /api/products/:id` - Buscar por ID
- `PUT /api/products/:id` - Atualizar
- `DELETE /api/products/:id` - Deletar

**Query params disponíveis:**
- `page` - Página atual
- `size` - Itens por página

### Vendas
- `GET /api/sales` - Listar com paginação
- `POST /api/sales` - Criar
- `GET /api/sales/:id` - Buscar por ID
- `DELETE /api/sales/:id` - Deletar
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
