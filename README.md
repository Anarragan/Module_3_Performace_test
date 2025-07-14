# Event management

A lightweight **Single Page Application (SPA)** built with **HTML, CSS, and Vanilla JavaScript**, powered by **Vite** for local development and **JSON Server** as a mock backend.

- Name: Ana Maria Barragan Ariza
- Clan: Gosling
- Email: anmabaar2002@gmail.com
- ID: 1006457424

---

## Features

-  Login and registration with local storage
-  Admin panel for managing events (add, edit, delete)
-  Course view (base setup for expansion)
-  Role-based view rendering (admin vs. user)
-  Fully responsive layout
-  Fast dev server with [Vite](https://vitejs.dev/)
-  Fake REST API via [JSON Server](https://github.com/typicode/json-server)

---

## Tech Stack

| Tool         | Purpose                         |
|--------------|---------------------------------|
| **HTML**     | Markup structure                |
| **CSS**      | Styling and layout              |
| **JavaScript** | Client-side logic (Vanilla)   |
| **Vite**     | Frontend dev server / bundler   |
| **JSON Server** | Mock backend API             |


---

##  Project Structure

```
project-root/
├── index.html
├── package-lock.json
├── assets/
│   ├── views.js
│   └── img/
│       └── avatar.png
├── css/
│   ├──style.css
├── src/
│   ├──api.js
│   ├──login.js
│   ├──main.js
│   ├──modal.js
│   ├──ui.js
│   ├──validate.js
├── db.json
└── package.json
```

---

##  Installation Guide

>  Note: `node_modules` is not included in the repository.  
After cloning the project, run `npm install` to install all required dependencies.


>  If you don't have Vite or JSON Server installed, follow the steps below.

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

---

##  Running the App

### 1. Start the Mock API Server

```bash
json-server --watch db.json --port 3001
```

This will start JSON Server at [http://localhost:3001](http://localhost:3001)

### 2. Start the Frontend Dev Server

In a new terminal:

```bash
npm run dev
```

Visit the app at: [http://localhost:5173](http://localhost:5173)

---

##  Default Admin User (Example)

>  Note: if you enter as an administrator you must do ctrl+s on the modal.js tab so that the buttons activate their functionalities (to improve :c).

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
##  To Do / Improvements

- [ ] fix modal loading issue
- [ ] fix registration form information
- [ ] Add search, filter and pagination

---

##  License

MIT License – free to use, share and improve.

---

## Feedback or Contributions?

Feel free to fork the repo, open issues or submit pull requests 🤝