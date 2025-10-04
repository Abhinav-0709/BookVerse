import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookDetails, updateBook } from '../services/api';

const EditBookPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: '', author: '', description: '', genre: '', year: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getBook = async () => {
            try {
                const { data } = await fetchBookDetails(id);
                setFormData({
                    title: data.book.title,
                    author: data.book.author,
                    description: data.book.description,
                    genre: data.book.genre,
                    year: data.book.year,
                });
            } catch (err) {
                console.error("Failed to fetch book for editing:", err);
                setError("Could not load book data.");
            }
            setLoading(false);
        };
        getBook();
    }, [id]);

    const handleChange = (e) => {
        const value = e.target.name === 'year' ? parseInt(e.target.value, 10) || '' : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await updateBook(id, formData);
            navigate(`/books/${id}`); // Go back to the details page
        } catch (err) {
            console.error("Failed to update book:", err);
            setError("Failed to save changes. Please try again.");
        }
    };

    if (loading) return <p className="text-text-secondary text-center mt-8">Loading Book for Editing...</p>;

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-container rounded-lg shadow-md border border-border">
            <h2 className="text-2xl font-bold text-center text-text-primary mb-6">Edit Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-text-secondary mb-2" htmlFor="title">Title</label>
                    <input
                        type="text" name="title" value={formData.title} onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary" required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-text-secondary mb-2" htmlFor="author">Author</label>
                    <input
                        type="text" name="author" value={formData.author} onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary" required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-text-secondary mb-2" htmlFor="description">Description</label>
                    <textarea
                        name="description" rows="4" value={formData.description} onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary" required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-text-secondary mb-2" htmlFor="genre">Genre</label>
                    <input
                        type="text" name="genre" value={formData.genre} onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary" required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-text-secondary mb-2" htmlFor="year">Published Year</label>
                    <input
                        type="number" name="year" value={formData.year} onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary" required
                    />
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <button type="submit" className="w-full bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-accent-hover">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditBookPage;