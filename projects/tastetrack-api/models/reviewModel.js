const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  dishId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewText: {
    type: String,
    trim: true
  },
  tags: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);

