const mongoose = require('mongoose');
require('dotenv').config(); // This line loads the .env file

const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB cluster
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully! 🎉');
    } catch (error) {
        // Log any errors that occur during connection
        console.error('MongoDB connection failed:', error.message);
        // Exit the process with failure code
        process.exit(1);
    }
};

module.exports = connectDB;