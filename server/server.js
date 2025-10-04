const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// --- MIDDLEWARE ---
app.use(cors()); // Use cors
app.use(express.json()); // This allows us to accept JSON data in the body

app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- ROUTES ---
app.use('/api/users', require('./routes/userRoutes')); // Mount the user routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
