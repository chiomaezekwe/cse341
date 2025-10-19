const Comment = require('../models/commentModel');

// Get all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('reviewId', 'reviewText')
      .populate('userId', 'name');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate('reviewId', 'reviewText')
      .populate('userId', 'name');
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    const saved = await comment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update comment
exports.updateComment = async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Comment not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Comment not found' });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
