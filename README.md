# 📚 Book Review API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing books and user-submitted reviews. It includes user authentication with **JWT** and supports pagination, filtering, and search.

---

## 🚀 Features

- User Signup and Login (JWT-based)
- Add, view, and search books
- Submit, update, and delete reviews (one review per user per book)
- Pagination and filtering by author or genre

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Variables**: Using `dotenv`

---

## 📁 Project Setup

1. **Clone the repository:**

```bash
git clone https://github.com/OmkarMasaye/Book_Review_System.git
cd Book_Review_System
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a .env file:**

```bash
PORT=3000
DB_URL=mongodb://localhost:27017/bookreviewdb
JWT_SECRET=your_jwt_secret_key
```

4. **Start MongoDB locally, then run the app:**

```bash
node index.js
```

## 🧪 API ENDPOINTS(Test with Postman)

1. **Sign Up**
 POST /signup

