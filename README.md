# 🎓 Student & Course Management SPA

A lightweight **Single Page Application (SPA)** built with **HTML, CSS, and Vanilla JavaScript**, powered by **Vite** for local development and **JSON Server** as a mock backend.

---

## 🚀 Features

- 🔐 Login and registration with local storage
- 👤 Admin panel for managing students (add, edit, delete)
- 📚 Course view (base setup for expansion)
- 🧩 Role-based view rendering (admin vs. student)
- 💻 Fully responsive layout
- ⚡ Fast dev server with [Vite](https://vitejs.dev/)
- 🔄 Fake REST API via [JSON Server](https://github.com/typicode/json-server)

---

## 🛠️ Tech Stack

| Tool         | Purpose                         |
|--------------|---------------------------------|
| **HTML**     | Markup structure                |
| **CSS**      | Styling and layout              |
| **JavaScript** | Client-side logic (Vanilla)   |
| **Vite**     | Frontend dev server / bundler   |
| **JSON Server** | Mock backend API             |

---

## 🌐 What is a SPA?

A **Single Page Application** dynamically updates the current page rather than loading a new one from the server. This makes interactions faster and smoother, ideal for user-driven platforms like dashboards.

---

## 📁 Project Structure

```
project-root/
├── index.html
├── stiles.css
├── main.js
├── login.js
├── modal.js
├── ui.js
├── validate.js
├── api.js
├── apiCourses.js
├── assets/
│   ├── views.js
│   └── img/
│       └── avatar.png
├── db.json
└── package.json
```

---

## 🧰 Installation Guide

> 📦 Note: `node_modules` is not included in the repository.  
After cloning the project, run `npm install` to install all required dependencies.


> ✨ If you don't have Vite or JSON Server installed, follow the steps below.

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Node.js (if not installed)

Download and install from: https://nodejs.org

Then verify with:

```bash
node -v
npm -v
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Add JSON Server and Vite Scripts

Make sure your `package.json` includes:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "server": "json-server --watch db.json --port 3000"
}
```

### 5. Create the `db.json` File

```json
{
  "users": [],
  "courses": []
}
```

You can seed it manually or via the app.

---

## ▶️ Running the App

### 1. Start the Mock API Server

```bash
npm run server
```

This will start JSON Server at [http://localhost:3000](http://localhost:3000)

### 2. Start the Frontend Dev Server

In a new terminal:

```bash
npm run dev
```

Visit the app at: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Default Admin User (Example)

Add to `db.json`:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "1234",
  "role": "admin",
  "phone": "123456789",
  "enrollNumber": "A1001",
  "dateOfAdmission": "2025-07-14"
}
```

You can now log in with:

```
Email: admin@example.com  
Password: 1234
```

---

## ✅ To Do / Improvements

- [ ] Add course CRUD interface
- [ ] Improve validation (email format, strong passwords)
- [ ] Use tokens or sessions instead of localStorage
- [ ] Add search, filter and pagination

---

## 📄 License

MIT License – free to use, share and improve.

---

## 💬 Feedback or Contributions?

Feel free to fork the repo, open issues or submit pull requests 🤝