const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    // This creates a reference to the User model
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // The model to link to
      required: true,
    },
  },
  {
    // This automatically adds `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', BookSchema);