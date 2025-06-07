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
 
 -POST /auth/signup 
 
 -Body:
 ```bash
{
  "username": "omkar",
  "email": "omkar@example.com",
  "password": "omkar@123",
  "mobile": "9876543210"
}
```
-Response:
```bash
{"message":"User registered successfully"}
```

2. **Login**

-POST/auth/login

-Body:
```bash
{
  "email": "omkar@example.com",
  "password": "123456"
}
```
-Response:
```bash
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODQ0MmE1ZjU3OTMyYmY4ZmFkZDUzODMiLCJpYXQiOjE3NDkzMDQwMzd9.Bt7il32xiENEA0Q9zmCuIdCsf7EMKKHQcHzDg7rlmVc","msg":"User login successfully"}
```
3. **GET books**

-GET /books?page=1&limit=10&author=Omkar&genre=Fiction

-Response
```bash
{
  "books": [
    {
      "_id": "684412d031dcbdfd8e1421cb",
      "title": "My Book",
      "author": "Omkar",
      "genre": "Fiction",
      "averageRating": 0,
      "createdAt": "2025-06-07T10:22:08.600Z",
      "updatedAt": "2025-06-07T10:22:08.600Z",
      "__v": 0
    }
  ],
  "totalRecords": ,1
  "totalPages": 1,
  "currentPage": 1
}
```
4. ** Get Book by ID (with average rating + reviews)**

    -GET /books/:id

   -Response
   ```bash
   {
    "books": [
    {
      "_id": "684412d031dcbdfd8e1421cb",
      "title": "My Book",
      "author": "Omkar",
      "genre": "Fiction",
      "averageRating": 0,
      "createdAt": "2025-06-07T10:22:08.600Z",
      "updatedAt": "2025-06-07T10:22:08.600Z",
      "__v": 0
    }
   ],
   "totalRecords": ,1
   "totalPages": 1,
   "currentPage": 1
   }
   ```
5. ** Search books by title or author**

     -GET/books/search?q=Rich

    -Response
   ```bash
     [
    {
        "_id": "684443653d39da12463d47f0",
        "title": "Rich Dad Poor Dad",
        "author": "Robert T. Kiyosaki",
        "genre": "Finance",
        "averageRating": 3,
        "createdAt": "2025-06-07T13:49:25.786Z",
        "updatedAt": "2025-06-07T14:35:17.215Z",
        "__v": 0
    }
   ]
   ```
6. **Create Review **

    -POST/reviews/:id/reviews (Use Book ID)
   
   -Body
   ```bash
   {
    "rating": 4,
     "comment": "Great book!"
   }
   ```
   -Response
   ```bash
      {
          "_id": "<review_id>",
          "bookId": "684412d031dcbdfd8e1421cb",
          "userId": "<user_id>",
          "rating": 4,
          "comment": "Great book!",
          "createdAt": "2025-06-07T21:47:00.000Z",
          "updatedAt": "2025-06-07T21:47:00.000Z",
          "__v": 0
      }
   ```
   7. **Update a Review
    
      -PUT /reviews/:id (Use Review ID)
      
      -Body
      ```bash
         {
           "rating": 4,
           "comment": "Great book!"
        }
      ```
      -Response:
      ```bash
      {
         "_id": "68445ba3b978a3fa05397a9e",
          "bookId": "68445a8f2c5d911cf2d5f172",
          "userId": "684442423d39da12463d47e9",
         "rating": 2,
         "comment": "badddd!",
        "createdAt": "2025-06-07T15:32:51.161Z",
       "updatedAt": "2025-06-07T16:47:54.749Z",
       "__v": 0
      }

      ```

   8. **Delete a review**

       -DELETE /reviews/:id (Use review ID)
      
       -Response:
      ```bash
      { message: 'Review deleted' }
      ```
      
   ## 📂 Folder Structure

        ├── config/
        │   └── db.js
        ├── models/
        │   ├── Book.js
        │   ├── Review.js
        │   └── User.js
        ├── routes/
        │   ├── books.js
        │   ├── reviews.js
        │   └── users.js
        ├── middleware/
        │   └── auth.js
        ├── .env
        ├── index.js
        └── package.json

   ## ✅ Assumptions & Design Decisions
      - Users can submit only one review per book.

      - Only the user who created a review can update or delete it.

      - Ratings are calculated as the average of all submitted reviews for a book.

      - Search is case-insensitive and supports partial match for titles and authors.

   ## 📬 API Testing with Postman
   
      To test this API, use Postman with:

       1. Bearer token (from login) for authenticated routes

       2. JSON body format

       3. Sample request/response examples as shown above



   



