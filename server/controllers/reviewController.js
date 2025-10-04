const Review = require('../models/Review');

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        // Check if the logged-in user is the one who wrote the review
        if (review.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        const { rating, reviewText } = req.body;
        review.rating = rating || review.rating;
        review.reviewText = reviewText || review.reviewText;
        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        // Check ownership
        if (review.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await review.deleteOne();
        res.json({ message: 'Review removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { updateReview, deleteReview };