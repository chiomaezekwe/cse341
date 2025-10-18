const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/userModel');
const Restaurant = require('./models/restaurantModel');
const Dish = require('./models/dishModel');
const Review = require('./models/reviewModel');
const Comment = require('./models/commentModel');

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tastetrack', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Seed function
async function seed() {
  try {
    // Clear existing data
    await User.deleteMany();
    await Restaurant.deleteMany();
    await Dish.deleteMany();
    await Review.deleteMany();
    await Comment.deleteMany();

    // Password hashing
    const hashedPassword = await bcrypt.hash('P@ssword123', 12);

    // USERS
    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        avatar: 'https://via.placeholder.com/150',
        location: 'Admin City',
        isAdmin: true
      },
      {
        name: 'Alice Smith',
        email: 'alice@example.com',
        password: hashedPassword,
        avatar: 'https://via.placeholder.com/150',
        location: 'New York'
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: hashedPassword,
        avatar: 'https://via.placeholder.com/150',
        location: 'Los Angeles'
      },
      {
        name: 'Charlie Lee',
        email: 'charlie@example.com',
        password: hashedPassword,
        avatar: 'https://via.placeholder.com/150',
        location: 'Chicago'
      }
    ]);

    // RESTAURANTS
    const restaurants = await Restaurant.insertMany([
      {
        name: 'Pizza Palace',
        location: 'New York',
        description: 'Authentic New York pizza',
        cuisineType: 'Italian',
        phone: '123-456-7890',
        website: 'http://pizzapalace.com'
      },
      {
        name: 'Sushi World',
        location: 'Los Angeles',
        description: 'Fresh sushi and rolls',
        cuisineType: 'Japanese',
        phone: '987-654-3210',
        website: 'http://sushiworld.com'
      },
      {
        name: 'Burger Barn',
        location: 'Chicago',
        description: 'Best burgers in town',
        cuisineType: 'American',
        phone: '555-555-5555',
        website: 'http://burgerbarn.com'
      },
      {
        name: 'Curry House',
        location: 'Houston',
        description: 'Spicy and flavorful curries',
        cuisineType: 'Indian',
        phone: '444-444-4444',
        website: 'http://curryhouse.com'
      }
    ]);

    // DISHES
    const dishes = await Dish.insertMany([
      {
        restaurantId: restaurants[0]._id,
        name: 'Pepperoni Pizza',
        description: 'Classic pizza with pepperoni slices',
        price: 12.99,
        category: 'Main',
        imageUrl: 'https://via.placeholder.com/200'
      },
      {
        restaurantId: restaurants[1]._id,
        name: 'Salmon Nigiri',
        description: 'Fresh salmon over rice',
        price: 9.99,
        category: 'Starter',
        imageUrl: 'https://via.placeholder.com/200'
      },
      {
        restaurantId: restaurants[2]._id,
        name: 'Cheeseburger',
        description: 'Grilled burger with cheese',
        price: 10.99,
        category: 'Dessert',
        imageUrl: 'https://via.placeholder.com/200'
      },
      {
        restaurantId: restaurants[3]._id,
        name: 'Chicken Tikka Masala',
        description: 'Chicken in creamy tomato sauce',
        price: 13.99,
        category: 'Dessert',
        imageUrl: 'https://via.placeholder.com/200'
      }
    ]);

    // REVIEWS
    const reviews = await Review.insertMany([
      {
        dishId: dishes[0]._id,
        userId: users[1]._id,
        rating: 5,
        reviewText: 'Loved the pizza!',
        tags: ['spicy', 'crispy']
      },
      {
        dishId: dishes[1]._id,
        userId: users[2]._id,
        rating: 4,
        reviewText: 'Very fresh sushi.',
        tags: ['fresh']
      },
      {
        dishId: dishes[2]._id,
        userId: users[3]._id,
        rating: 3,
        reviewText: 'Burger was okay.',
        tags: ['average']
      },
      {
        dishId: dishes[3]._id,
        userId: users[0]._id,
        rating: 5,
        reviewText: 'Amazing curry!',
        tags: ['spicy', 'flavorful']
      }
    ]);

    // COMMENTS
    await Comment.insertMany([
      {
        reviewId: reviews[0]._id,
        userId: users[2]._id,
        commentText: 'Totally agree!'
      },
      {
        reviewId: reviews[1]._id,
        userId: users[0]._id,
        commentText: 'Sushi is life!'
      },
      {
        reviewId: reviews[2]._id,
        userId: users[1]._id,
        commentText: 'Try the chicken burger next time.'
      },
      {
        reviewId: reviews[3]._id,
        userId: users[3]._id,
        commentText: 'Curry never disappoints.'
      }
    ]);

    console.log('Seed data inserted successfully!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    mongoose.connection.close();
  }
}

// Run seeding
seed();
