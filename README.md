# 👥 blogging-platform-api

> **Portfolio Project** — A RESTful API with CRUD routes for a personal blog. The included core functions include creating posts, updating a post, deleting a post, searching posts by ID, listing all posts, and filtering by keywords.

![Status](https://img.shields.io/badge/status-complete-green)

---

## 📌 About

**blogging-platform-api** is a simple project from [roadmap.sh](https://roadmap.sh/projects/blogging-platform-api) to improve my skills on HTTP methods, status codes, error handling as well as a more polished API workflow.

---

## 🏗️ Project Structure

```
blogging-platform-api/
├── migrations/
│   └── 001_migration_name.sql          # migrations with a number prefix
├── src/
│   ├── database/
│   │   └── pool.ts          # database connection pool
│   ├── posts/
│   │   ├── posts.router.ts
│   │   ├── posts.controller.ts
│   │   └── posts.repository.ts
│   ├── service/
│   │   └── migration.service.ts           # simulates 'prisma migrate deploy'
│   ├── middleware/
│   │   └── errorHandler.ts
│   └── app.ts
├── scripts/
│   └── migrate.ts
├── .prettierrc
├── eslint.config.js
├── package.json
├── README.md
└── tsconfig.json
```

---

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/barbosacaio/blogging-platform-api
   cd blogging-platform-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Execute the program**

   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

| Method   | Endpoint            | Description              |
| -------- | ------------------- | ------------------------ |
| `GET`   | `/posts/`    | Lists all posts        |
| `GET`   | `/posts/:postId`    | Lists a specific post        |
| `GET`   | `/posts/?search=`    | Searches posts by title/content        |
| `POST`   | `/posts/`    | Adds a new post        |
| `PATCH`   | `/posts/:postId`    | Updates a post        |
| `DELETE`   | `/posts/:postId`    | Deletes a post        |
---

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to open an [issue](https://github.com/barbosacaio/blogging-platform-api/issues).

---

## 👤 Author

**Caio Barbosa**

- GitHub: [@barbosacaio](https://github.com/barbosacaio)
- LinkedIn: [Caio Henrique Barbosa](https://www.linkedin.com/in/barbosacaio/)

---

<p align="center">Made with ❤️ as a portfolio project</p>
