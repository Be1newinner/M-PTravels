# 🧳 Trip Booking Platform

A full-featured **Trip Booking Website** built with **Next.js**, **Express.js**, and **MongoDB**. This project is built using a **Turborepo** structure with separate **Admin Panel**, **Client Panel**, and **Express API Backend** — all containerized using **Docker** for easy deployment and scalability.

> ✨ Open source contribution friendly — feel free to fork, explore, and contribute!

---

## 🌐 Live Preview

[mp-travels.vercel.app](https://mp-travels.vercel.app)

---

## 📦 Tech Stack

| Layer         | Tech Used                     |
|--------------|-------------------------------|
| Frontend     | Next.js, React.js, TailwindCSS, ShadCN |
| Backend API  | Express.js, MongoDB, Mongoose |
| Auth         | JWT, Bcrypt                   |
| Image Upload | Cloudinary                   |
| DevOps       | Docker, Turborepo             |

---

## 📁 Monorepo Structure (Turborepo)

```
apps/
  ├── admin         # Admin panel
  ├── client        # Client-facing trip booking app
  └── backend       # Express.js API server

packages/
  └── ui            # Shared components (optional)
```

---

## ✨ Features

### 🧑‍💻 Admin Panel
- JWT-based authentication with Bcrypt password hashing
- Create, Update, Delete:
  - 🚍 Buses
  - 📦 Tour Packages
  - ✍️ Blog Posts
- Dashboard for trip management

### 🌍 Client Panel
- Book trips seamlessly
- View travel packages, blogs, and bus listings
- Responsive UI with TailwindCSS & ShadCN

### 🔐 Authentication
- Secure login system for Admin using:
  - JSON Web Tokens (JWT)
  - Password hashing with Bcrypt

### ☁️ Cloudinary Integration
- Upload and manage images for blogs, packages, buses

---

## 🛠️ Getting Started (Dev Mode)

### 1. Clone the Repository

```bash
git clone https://github.com/Be1newinner/M-PTravels.git
cd M-PTravels
```

### 2. Install Dependencies

```bash
pnpm install
```

Or

```bash
npm install -w apps/admin -w apps/client -w apps/backend
```

### 3. Environment Setup

Create `.env` files in each app folder:

#### `apps/backend/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

#### `apps/admin/.env.local` & `apps/client/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Run All Apps with Turbo

```bash
pnpm turbo run dev
```

---

## 🐳 Docker Setup (Optional)

To run the entire project using Docker:

```bash
docker-compose up --build
```

> Add `docker-compose.yml` with all services (`client`, `admin`, `backend`, `mongo`) defined for smoother container orchestration.

---

## 🧠 Contributing

We welcome contributions! Here’s how you can help:

- 🚀 Improve UI or UX
- 🐛 Fix bugs
- 📖 Enhance documentation
- 🌍 Add localization
- 🔐 Improve security practices

### Steps:

1. Fork the repo
2. Create a new branch: `feat/my-feature`
3. Commit your changes
4. Push and open a PR

---

## 🧾 License

This project is open source under the [MIT License](LICENSE).

---

## 🙌 Credits

Developed by [Vijay](https://github.com/be1newinner)  
Follow my journey on YouTube → [Asaan Hai Coding](https://www.youtube.com/@asaan_hai_coding)

---

## 📬 Contact

For queries, suggestions, or collaborations:  
📧 Email: be1newinner@gmail.com  
📸 Instagram: [@asaan_hai_coding](https://www.instagram.com/be1newinner)


Let me know if you want:

- A matching `CONTRIBUTING.md`
- `docker-compose.yml` template
- Badges (build, license, PRs welcome, etc.)
- Deployment guide (Vercel, Railway, EC2)

This README is built to make the project *attractive to contributors*, *FAANG-portfolio ready*, and *easy to onboard*.
