import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../services/api';

const AddBookPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        genre: '',
        year: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        // For the 'year' field, ensure the value is a number
        const value = e.target.name === 'year' ? parseInt(e.target.value, 10) || '' : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await createBook(formData);
            // On success, navigate to the new book's detail page
            navigate(`/books/${data._id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add book.');
            console.error(err);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-container rounded-lg shadow-md border border-border">
            <h2 className="text-2xl font-bold text-center text-text-primary mb-6">Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-text-secondary mb-2" htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-text-secondary mb-2" htmlFor="author">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-text-secondary mb-2" htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary"
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-text-secondary mb-2" htmlFor="genre">Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-text-secondary mb-2" htmlFor="year">Published Year</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary"
                        required
                    />
                </div>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <button type="submit" className="w-full bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-accent-hover">
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBookPage;