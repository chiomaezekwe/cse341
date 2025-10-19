const Dish = require('../models/dishModel');

// GET all dishes
exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().populate('restaurantId', 'name');
    res.json(dishes);
  } catch (err) {
    //console.error('Error fetching dishes:', err); // for debugging
    res.status(500).json({ error: err.message });
  }
};

// GET dish by ID
exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id).populate('restaurantId', 'name');
    if (!dish) return res.status(404).json({ error: 'Dish not found' });
    res.json(dish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create new dish
exports.createDish = async (req, res) => {
  try {
    const newDish = new Dish(req.body);
    const saved = await newDish.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update dish
exports.updateDish = async (req, res) => {
  try {
    const updated = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Dish not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE dish
exports.deleteDish = async (req, res) => {
  try {
    const deleted = await Dish.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Dish not found' });
    res.json({ message: 'Dish deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
