import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../services/api';
import BookCard from '../components/BookCard';

// A hardcoded list of genres for our filter dropdown.
// In a larger application, you might fetch this from the backend.
const genres = ["Fantasy", "Science Fiction", "Mystery", "Thriller", "Romance", "Non-Fiction", "History"];

const HomePage = () => {
    // State for books and pagination
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    // State for search and filter UI
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    // Effect for fetching data when dependencies change
    useEffect(() => {
        const getBooks = async () => {
            setLoading(true);
            try {
                const params = {
                    page: currentPage,
                    search: searchTerm,
                    genre: selectedGenre,
                };
                const { data } = await fetchBooks(params);
                setBooks(data.books);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Failed to fetch books:", error);
                setBooks([]); // Clear books on error
                setTotalPages(1);
            }
            setLoading(false);
        };
        getBooks();
    }, [currentPage, searchTerm, selectedGenre]); // Re-run effect when any of these change

    // Effect to reset to page 1 whenever a new search or filter is applied
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedGenre]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-text-primary mb-6 text-center">Discover New Books</h1>

            {/* Search and Filter UI */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 border border-border rounded-md bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    <option value="">All Genres</option>
                    {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
                </select>
            </div>

            {/* Book Grid and Loading State */}
            {loading ? (
                <p className="text-center text-text-secondary mt-10">Loading books...</p>
            ) : books.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-text-secondary mt-10">No books found. Try adjusting your search or filters.</p>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-container border border-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background"
                    >
                        Previous
                    </button>
                    <span className="text-text-primary font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-container border border-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;