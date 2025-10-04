const express = require('express');
const router = express.Router();
const {
    getBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
    addBookReview,
} = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

// Base route: /api/books
router.route('/')
    .get(getBooks) // Public: Anyone can get the list of books
    .post(protect, createBook); // Private: Only logged-in users can add a book

// Route for a specific book by ID: /api/books/:id
router.route('/:id')
    .get(getBookById) // Public: Anyone can view a single book
    .put(protect, updateBook) // Private: Only the owner can update the book
    .delete(protect, deleteBook); // Private: Only the owner can delete the book

// Route for adding a review to a book: /api/books/:id/reviews
router.route('/:id/reviews')
    .post(protect, addBookReview); // Private: Only logged-in users can add a review

module.exports = router;