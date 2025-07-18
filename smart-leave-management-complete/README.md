# 🗓️ Smart Leave Management System

A full-stack Leave Management System built with:

- **Backend:** Node.js + Express + MySQL + Sequelize
- **Frontend:** React + TypeScript + Vite + Tailwind CSS + shadcn/ui

Helps employees apply for leave, managers approve/reject, and admins manage users and leave balances.

---

## ✨ Features

- JWT-based authentication & role-based dashboards (Employee, Manager, Admin)
- Apply, approve, reject leave requests
- Validation for overlapping leave & leave balance
- Sequelize migrations & seeders for database management
- Modern, responsive UI with Tailwind CSS & shadcn/ui
- Type-safe frontend using React + TypeScript
- Notifications, modals, loaders, clean RESTful APIs

---

## ⚙️ Tech Stack

| Layer    | Technologies                                                                                    |
| -------- | ----------------------------------------------------------------------------------------------- |
| Backend  | Node.js, Express.js, MySQL, Sequelize ORM, JWT, dotenv, ESLint, Prettier                        |
| Frontend | React 18+, TypeScript, Vite, Tailwind CSS, shadcn/ui, lucide-react, react-hook-form, zod, Axios |

---

sections:

- title: 🚀 Getting Started
  content: |

  1. Clone the repository:

  ```bash
  https://github.com/CodeLabWithDev/leave-managment.git
  ```

````

2. Install dependencies:

```bash
npm install
```

3. Create and configure `.env` file:

```bash
cp .env.example .env
```

4. Run in development mode:

```bash
npm run dev
```

Server runs on `http://localhost:5000`.

  - title: ⚙️ Project Setup
    content: |

    ### 🛠 Install dependencies

    ```bash
    npm install
    ```

    ### 📦 Setup environment

    Create `.env` file:

    ```bash
    cp .env.example .env
    ```

    Then update variables:

    ```
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=leave_management
    JWT_SECRET=your_secret_key
    ```

    ### 🏗 Create MySQL database

    Login to MySQL and run:

    ```sql
    CREATE DATABASE leave_management;
    ```

    ### ⚙️ Initialize Sequelize

    (If you haven't already)

    ```bash
    npx sequelize-cli init
    ```

    This creates folders:

    ```
    config/, models/, migrations/, seeders/
    ```

    ### ✏️ Create new migration

    ```bash
    npx sequelize-cli migration:generate --name create-users-table
    ```

    ### ✅ Run migrations

    ```bash
    npx sequelize-cli db:migrate
    ```

    ### ⏪ Rollback last migration

    ```bash
    npx sequelize-cli db:migrate:undo
    ```

    ### 🌱 Create new seeder

    ```bash
    npx sequelize-cli seed:generate --name demo-users
    ```

    ### 🌱 Run seeders

    ```bash
    npx sequelize-cli db:seed:all
    ```

    ### 🧹 Undo seeders

    ```bash
    npx sequelize-cli db:seed:undo:all
    ```

    ### 📦 Recommended npm scripts

    Add to `package.json` for easier usage:

    ```json
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js",
      "migrate": "npx sequelize-cli db:migrate",
      "migrate:undo": "npx sequelize-cli db:migrate:undo",
      "seed": "npx sequelize-cli db:seed:all",
      "seed:undo": "npx sequelize-cli db:seed:undo:all"
    }
    ```

    ### 🚀 Run the app

    ```bash
    npm run dev
    ```

    Server will run on `http://localhost:5000`.
````
