import React, { useState } from 'react';
import { addReview } from '../services/api';

const AddReviewForm = ({ bookId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await addReview(bookId, { rating, reviewText });
      setRating(5);
      setReviewText('');
      onReviewAdded(); // Notify the parent component to refetch reviews
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-container p-4 rounded-lg border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-2">Write a Review</h3>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-text-secondary mb-1">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary"
        >
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Very Good</option>
          <option value="3">3 - Good</option>
          <option value="2">2 - Fair</option>
          <option value="1">1 - Poor</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="reviewText" className="block text-text-secondary mb-1">Review</label>
        <textarea
          id="reviewText"
          rows="3"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary"
          required
        ></textarea>
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button type="submit" className="w-full bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-accent-hover">
        Submit Review
      </button>
    </form>
  );
};

export default AddReviewForm;