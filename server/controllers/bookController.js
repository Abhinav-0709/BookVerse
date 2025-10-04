const Book = require('../models/Book');
const Review = require('../models/Review');


const createBook = async (req, res) => {

    const { title, author, description, genre, year } = req.body;

    try {
        const book = new Book({
            title,
            author,
            description,
            genre,
            year,
            addedBy: req.user._id,
        });

        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};



const getBooks = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // 5 books per page, as required
    const skip = (page - 1) * limit;


    const { search, genre } = req.query;
    const filter = {};

    // Add genre to the filter if it exists
    if (genre) {
        filter.genre = { $regex: genre, $options: 'i' };
    }

    // Add search term to the filter if it exists
    // This will search for the term in both the title and author fields, case-insensitively
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } },
        ];
    }

    try {
        // Apply the filter object to our queries
        const totalBooks = await Book.countDocuments(filter);
        const books = await Book.find(filter)
            .populate('addedBy', 'name')
            .skip(skip)
            .limit(limit);

        res.json({
            books,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('addedBy', 'name');

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Find reviews for the book
        const reviews = await Review.find({ bookId: req.params.id }).populate('userId', 'name');

        // Calculate average rating
        let avgRating = 0;
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
            avgRating = totalRating / reviews.length;
        }

        res.json({
            book,
            reviews,
            avgRating: avgRating.toFixed(1) // Format to one decimal place
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const addBookReview = async (req, res) => {
    const { rating, reviewText } = req.body;
    const bookId = req.params.id;

    try {
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if this user has already reviewed this book
        const alreadyReviewed = await Review.findOne({
            bookId: bookId,
            userId: req.user._id,
        });

        if (alreadyReviewed) {
            return res.status(400).json({ message: 'You have already reviewed this book' });
        }

        // Create the new review
        const review = new Review({
            bookId,
            userId: req.user._id,
            rating,
            reviewText,
        });

        await review.save();

        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if the logged-in user is the one who added the book
        if (book.addedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check ownership
        if (book.addedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Also delete all reviews associated with the book
        await Review.deleteMany({ bookId: req.params.id });
        await book.deleteOne();

        res.json({ message: 'Book and associated reviews removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};





module.exports = { createBook, getBooks, getBookById, addBookReview, updateBook, deleteBook };
