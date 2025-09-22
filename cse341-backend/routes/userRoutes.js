// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

// GET /users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users); // Send data back to frontend
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST /users - add a new user with base64 image (new route)
router.post('/users', async (req, res) => {
  try {
    // Read image and convert to base64
    const imagePath = path.join(__dirname, '../images/profile.jpg');
    const base64Image = fs.readFileSync(imagePath, { encoding: 'base64' });

    await newUser.save();
    res.status(201).json({ message: 'User added', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

module.exports = router;
