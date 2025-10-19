const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');
const { validateDish } = require('../validators/dishValidator');


/**
 * @swagger
 * tags:
 *   name: Dishes
 *   description: Dish management within restaurants
 */

/**
 * @swagger
 * /api/dishes:
 *   get:
 *     summary: Get all dishes
 *     tags: [Dishes]
 *     responses:
 *       200:
 *         description: List of dishes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dish'
 */
router.get('/', dishController.getAllDishes);

/**
 * @swagger
 * /api/dishes/{id}:
 *   get:
 *     summary: Get dish by ID
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Dish ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dish object
 *       404:
 *         description: Dish not found
 */
router.get('/:id', dishController.getDishById);

/**
 * @swagger
 * /api/dishes:
  *   post:
 *     summary: Create a new dish
 *     tags: [Dishes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DishCreate'
 *     responses:
 *       201:
 *         description: Dish created successfully
 */
router.post('/', validateDish, dishController.createDish);

/**
 * @swagger
 * /api/dishes/{id}:
  *   put:
 *     summary: Update dish by ID
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Dish ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated dish data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DishUpdate'
 *     responses:
 *       200:
 *         description: Updated dish object
 *       404:
 *         description: Dish not found
 */
router.put('/:id', validateDish, dishController.updateDish);

/**
 * @swagger
 * /api/dishes/{id}:
  *   delete:
 *     summary: Delete dish by ID
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Dish ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dish deleted successfully
 *       404:
 *         description: Dish not found
 */
router.delete('/:id', dishController.deleteDish);

module.exports = router;
