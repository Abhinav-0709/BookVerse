import axios from 'axios';



// Create an Axios instance with a base URL
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// IMPORTANT: This interceptor runs before every request
// It checks if we have a token in localStorage and adds it to the headers
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Define the API calls
export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);
// export const fetchBooks = (page = 1) => API.get(`/books?page=${page}`);
export const fetchBookDetails = (id) => API.get(`/books/${id}`);
export const addReview = (bookId, reviewData) => API.post(`/books/${bookId}/reviews`, reviewData);
export const createBook = (bookData) => API.post('/books', bookData);
export const updateBook = (id, bookData) => API.put(`/books/${id}`, bookData);
export const deleteBook = (id) => API.delete(`/books/${id}`);
// Review API calls
export const updateReview = (id, reviewData) => API.put(`/reviews/${id}`, reviewData);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);
export const fetchBooks = (params) => {
    // params will be an object like { page: 1, search: 'hobbit', genre: 'Fantasy' }
    return API.get('/books', { params });
};