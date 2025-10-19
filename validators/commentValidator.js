const { body, validationResult } = require('express-validator');

exports.validateComment = [
  body('reviewId').notEmpty().withMessage('Review ID is required'),
  body('userId').notEmpty().withMessage('User ID is required'),
  body('commentText').notEmpty().withMessage('Comment text is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
