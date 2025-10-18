// app.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const { swaggerUi, specs } = require('./swagger/swagger'); // Only import from here

dotenv.config();
require('./config/passport'); // GitHub strategy

const app = express();

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const commentRoutes = require('./routes/commentRoutes');
app.use('/api/comments', commentRoutes);

const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);

const restaurantRoutes = require('./routes/restaurantRoutes');
app.use('/api/restaurants', restaurantRoutes);

const dishRoutes = require('./routes/dishRoutes');
app.use('/api/dishes', dishRoutes);

module.exports = app;



