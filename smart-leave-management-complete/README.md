# 🚀 Smart Leave Management System

## 📦 Installation

```bash
npm install
```

## ⚙ Setup Database

Make sure MySQL is running and database exists (`smart_leave` or name from .env).

```bash
npx sequelize db:create
npm run migrate
npm run seed
```

## 🏁 Run the server

```bash
npm run dev
```

Server: http://localhost:5000

## ✨ Features
- Node.js + Express + Sequelize + MySQL
- JWT auth with roles: Admin, Manager, Employee
- Apply/cancel/approve/reject leaves
- Cron to reset yearly balances
- Prevent overlap, manager team logic
- Modular services, controllers, middlewares

Happy coding! 🚀
