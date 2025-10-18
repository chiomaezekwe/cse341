// models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  avatar: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  favorites: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  location: String,
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Do not return password by default
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to compare password
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);
