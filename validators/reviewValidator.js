const { body, validationResult } = require('express-validator');

exports.validateReview = [
  body('dishId').notEmpty().withMessage('Dish ID is required'),
  body('userId').notEmpty().withMessage('User ID is required'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be a number between 1 and 5'),
  body('reviewText').optional().isString(),
  body('tags').optional().isArray(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
