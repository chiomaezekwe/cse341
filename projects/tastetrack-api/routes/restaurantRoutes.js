const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { validateRestaurant } = require('../validators/restaurantValidator');


/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Restaurant management
 */

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: List of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 */
router.get('/', restaurantController.getAllRestaurants);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Get restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Restaurant ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant object
 *       404:
 *         description: Restaurant not found
 */
router.get('/:id', restaurantController.getRestaurantById);

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantCreate'
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 */
router.post('/', validateRestaurant, restaurantController.createRestaurant);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   put:
 *     summary: Update restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Restaurant ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated restaurant data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantUpdate'
 *     responses:
 *       200:
 *         description: Updated restaurant object
 *       404:
 *         description: Restaurant not found
 */
router.put('/:id', validateRestaurant, restaurantController.updateRestaurant);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   delete:
 *     summary: Delete restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Restaurant ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       404:
 *         description: Restaurant not found
 */
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;
