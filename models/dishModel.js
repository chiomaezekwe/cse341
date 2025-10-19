const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Starter', 'Main', 'Dessert', 'Drink'],
    default: 'Main'
  },
  photoUrl: String,
  isVegetarian: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Dish', dishSchema);
