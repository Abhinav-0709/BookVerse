import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchBookDetails, deleteBook, deleteReview } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import AddReviewForm from '../components/AddReviewForm';
import { FaArrowLeft } from 'react-icons/fa';

const BookDetailsPage = () => {
  // --- Hooks and State Management ---
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0); // A key to force re-render when data changes

  // --- Data Fetching Effect ---
  useEffect(() => {
    const getBookData = async () => {
      setLoading(true);
      try {
        const { data } = await fetchBookDetails(id);
        setBook(data.book);
        setReviews(data.reviews);
        setAvgRating(data.avgRating);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
        setBook(null);
      }
      setLoading(false);
    };
    getBookData();
  }, [id, key]); // Re-fetch if the book ID or the key changes

  // --- Event Handlers ---
  const triggerRefetch = () => {
    setKey(prevKey => prevKey + 1);
  };

  const handleDeleteBook = async () => {
    if (window.confirm('Are you sure you want to delete this book? This will also remove all its reviews.')) {
      try {
        await deleteBook(book._id);
        navigate('/');
      } catch (error) {
        console.error("Failed to delete book:", error);
        alert("Failed to delete the book. Please try again.");
      }
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
        triggerRefetch(); // Refetch data to update review list and average rating
      } catch (error) {
        console.error("Failed to delete review:", error);
      }
    }
  };

  // --- Render Logic ---
  if (loading) {
    return <p className="text-center text-text-secondary mt-10">Loading book details...</p>;
  }

  if (!book) {
    return <p className="text-center text-text-primary mt-10">Book not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">

      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4"
      >
        <FaArrowLeft />
        Back to list
      </button>

      
      {/* Book Info Section */}
      <div className="bg-container p-6 rounded-lg shadow-md border border-border relative">
        {/* Conditional rendering for book owner actions (Edit/Delete) */}
        {user && user.id === book.addedBy._id && (
          <div className="absolute top-4 right-4 flex space-x-2">
            <Link
              to={`/books/${book._id}/edit`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={handleDeleteBook}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
            >
              Delete
            </button>
          </div>
        )}

        <h1 className="text-3xl font-bold text-text-primary pr-32">{book.title}</h1>
        <p className="text-lg text-text-secondary mt-1">by {book.author}</p>
        <div className="mt-4 text-text-primary">
          <p className="mb-4">{book.description}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Published Year:</strong> {book.year}</p>
          <p className="text-sm text-text-secondary mt-4">Added by: {book.addedBy.name}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Reviews (Average Rating: {avgRating} ⭐)
        </h2>
        {/* Conditional rendering for the review form */}
        {user && <AddReviewForm bookId={id} onReviewAdded={triggerRefetch} />}

        <div className="space-y-4 mt-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="bg-container p-4 rounded-lg border border-border relative">
                {/* Conditional rendering for review owner actions */}
                {user && user.id === review.userId._id && (
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}

                <p className="font-bold text-text-primary">{review.userId.name}</p>
                <p className="text-accent">{'⭐'.repeat(review.rating)}</p>
                <p className="text-text-secondary mt-2">{review.reviewText}</p>
              </div>
            ))
          ) : (
            <p className="text-text-secondary italic mt-4">No reviews yet. Be the first to write one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;