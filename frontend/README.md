# Financy — Frontend

React SPA for managing personal finances. Connects to the Financy GraphQL API to track transactions and categories.

---

## Stack

- **Framework** — React 19 + TypeScript + Vite
- **Styling** — Tailwind CSS v4
- **GraphQL** — graphql-request + TanStack Query
- **Forms** — React Hook Form
- **Routing** — React Router
- **State** — Zustand (auth)

---

## Pages

### Dashboard

Overview of your financial activity — balance summary and category breakdown.

![Dashboard](public/images/dashboard.png)

---

### Login flow

Authentication screen with login and register.

<video src="public/images/login-flow.mp4" controls width="100%"></video>

---

### Add a transaction

Create a new income or expense entry with description, value, date, and category.

<video src="public/images/add-new-transaction.mp4" controls width="100%"></video>

---

### Filter transactions

Filter your transaction list by type, category, period, or free-text search.

<video src="public/images/filtering-transactions.mp4" controls width="100%"></video>

---

### Add a category

Create a custom category with a name, description, and icon.

<video src="public/images/add-new-category.mp4" controls width="100%"></video>

---

## Getting started

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

App runs at `http://localhost:5173`.

> Make sure the backend is running at `http://localhost:4000/graphql` before starting the frontend.

---

## Environment variables

Create a `.env` file at the root of the frontend folder:

```env
VITE_GRAPHQL_URL=http://localhost:4000/graphql
```
