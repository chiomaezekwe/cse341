const { body, validationResult } = require('express-validator');

exports.validateDish = [
  body('restaurantId').notEmpty().withMessage('Restaurant ID is required'),
  body('name').notEmpty().withMessage('Dish name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').optional().isString(),
  body('isVegetarian').optional().isBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
