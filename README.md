BookVerse: A Book Review Platform 📖 (Live at:-https://book-verse-gilt-ten.vercel.app/)

A full-stack web application built with the MERN stack where book lovers can discover, share, and review their favorite books in a clean, modern interface.

✨ Key Features
Secure User Accounts: Sign up and log in securely to a personal account using JWT authentication.

Book Discovery & Management: Browse a paginated list of all books, add new books to the collection, and edit or delete books you've added.

Interactive Review System: Leave detailed text reviews and star ratings on any book, manage your own reviews, and see dynamically updated average ratings.

Powerful Search & Filtering: Instantly search for books by title or author and filter the entire collection by genre.

Modern User Experience: A fully responsive design with a dynamic, staggered grid layout, an intuitive navbar, and a toggleable light/dark theme.

🛠️ Tech Stack
Frontend: React, Vite, Tailwind CSS, React Router, Axios, React Icons

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Authentication: JSON Web Tokens (JWT), bcrypt.js

🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
You need to have the following software installed on your machine:

Node.js (which includes npm)

Git

A MongoDB Atlas account for the database (the free tier is sufficient).

Installation & Setup
Clone the repository:

Bash

git clone https://github.com/Abhinav-0709/book-review-platform
cd book-review-platform
Backend Setup:

Bash

# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file in the /server directory
touch .env
Add the following environment variables to your .env file. Get your MONGO_URI from your MongoDB Atlas dashboard.

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_key_for_jwt
Start the backend server
node server.js

The server will run on http://localhost:5000
Frontend Setup:

Bash

# Open a new terminal and navigate to the client directory
cd client

# Install dependencies
npm install

# Start the frontend development server
npm run dev
# The React app will be available at http://localhost:5173
API Documentation
The backend provides the following RESTful API endpoints.

User Routes
Base URL: /api/users

Endpoint	Method	Description	Access	Request Body
/register	POST	Registers a new user.	Public	{ "name", "email", "password" }
/login	POST	Authenticates a user and returns a JWT.	Public	{ "email", "password" }

Book Routes
Base URL: /api/books

Endpoint	Method	Description	Access	Request Body
/	GET	Gets a paginated list of all books. Supports ?page, ?search, and ?genre queries.	Public	-
/	POST	Adds a new book.	Private	{ "title", "author", "description", "genre", "year" }
/:id	GET	Gets details for a single book, including reviews and average rating.	Public	-
/:id	PUT	Updates a book. Only the creator can update.	Private	{ "title", "author", ... }
/:id	DELETE	Deletes a book and all its associated reviews. Only the creator can delete.	Private	-

Review Routes
Base URL: /api/reviews & /api/books/:id/reviews

Endpoint	Method	Description	Access	Request Body
/api/books/:id/reviews	POST	Adds a new review to a book.	Private	{ "rating", "reviewText" }
/api/reviews/:id	PUT	Updates a review. Only the creator can update.	Private	{ "rating", "reviewText" }
/api/reviews/:id	DELETE	Deletes a review. Only the creator can delete.	Private	-

License
This project is licensed under the MIT License.
