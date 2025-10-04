import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { register } from '../services/api';

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { login: authLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Call the register function from our API service
            const { data } = await register(formData);
            // On success, call the login function from AuthContext
            authLogin(data.token);
            // Navigate to the homepage
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-container rounded-lg shadow-md border border-border">
            <h2 className="text-2xl font-bold text-center text-text-primary mb-6">Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-text-secondary mb-2" htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-text-secondary mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-text-secondary mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-accent-hover transition duration-300"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignupPage;