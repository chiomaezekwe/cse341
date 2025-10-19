const { body, validationResult } = require('express-validator');

exports.validateRestaurant = [
  body('name').notEmpty().withMessage('Name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('cuisineType').notEmpty().withMessage('Cuisine type is required'),
  // Optional: add validation for avgRating if needed
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
