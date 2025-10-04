import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
const BookCard = ({ book }) => {
    return (
        <div className="bg-container p-5 rounded-lg shadow-md border border-border flex flex-col">
            <h3 className="text-xl font-bold text-text-primary mb-2">{book.title}</h3>
            <p className="text-text-secondary mb-4">by {book.author}</p>
            <p className="text-text-primary flex-grow mb-4 line-clamp-3">{book.description}</p>
            <Link
                to={`/books/${book._id}`}
                className="btn mt-auto text-center bg-accent text-white font-semibold py-2 px-4 rounded-md hover:bg-accent-hover transition duration-300"
            >
                View Details
            </Link>
        </div>
    );
};

export default BookCard;