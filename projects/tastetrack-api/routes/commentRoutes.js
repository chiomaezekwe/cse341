const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { validateComment } = require('../validators/commentValidator');


/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comments on reviews or dishes
 */

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get('/', commentController.getAllComments);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Get comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Comment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment object
 *       404:
 *         description: Comment not found
 */
router.get('/:id', commentController.getCommentById);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentCreate'
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
router.post('/', validateComment, commentController.createComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Comment ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated comment data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentUpdate'
 *     responses:
 *       200:
 *         description: Updated comment object
 *       404:
 *         description: Comment not found
 */
router.put('/:id', validateComment, commentController.updateComment);

/**
 * @swagger
 * /api/comments/{id}:
  *   delete:
 *     summary: Delete comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Comment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
router.delete('/:id', commentController.deleteComment);

module.exports = router;
