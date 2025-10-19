const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TasteTrack API',
      version: '1.0.0',
    },
    servers: [
      { url: 'https://cse341-tastetrack-api.onrender.com' }  //http://localhost:3000' (HTTP) OR https://cse341-tastetrack-api.onrender.com' (HTTPS)
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        // --- User Schemas ---
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            avatar: { type: 'string' },
            isAdmin: { type: 'boolean' },
            favorites: {
              type: 'array',
              items: { type: 'string' }
            },
            location: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        UserCreate: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            avatar: { type: 'string' },
            location: { type: 'string' }
          }
        },
        UserUpdate: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            avatar: { type: 'string' },
            location: { type: 'string' },
            isAdmin: { type: 'boolean' } // <-- Added here
          }
        },

        // --- Review Schemas ---
        Review: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            dishId: { type: 'string' },
            userId: { type: 'string' },
            rating: { type: 'integer', minimum: 1, maximum: 5 },
            reviewText: { type: 'string' },
            tags: {
              type: 'array',
              items: { type: 'string' }
            },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        ReviewCreate: {
          type: 'object',
          required: ['dishId', 'userId', 'rating'],
          properties: {
            dishId: { type: 'string' },
            userId: { type: 'string' },
            rating: { type: 'integer', minimum: 1, maximum: 5 },
            reviewText: { type: 'string' },
            tags: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        },

        // --- Restaurant Schemas ---
        Restaurant: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            location: { type: 'string' },
            description: { type: 'string' },
            cuisine: { type: 'string' },
            phone: { type: 'string' },
            website: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        RestaurantCreate: {
          type: 'object',
          required: ['name', 'location'],
          properties: {
            name: { type: 'string' },
            location: { type: 'string' },
            description: { type: 'string' },
            cuisine: { type: 'string' },
            phone: { type: 'string' },
            website: { type: 'string' }
          }
        },

        // --- Dish Schemas ---
        Dish: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            restaurantId: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number', format: 'float' },
            category: { type: 'string' },
            imageUrl: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        DishCreate: {
          type: 'object',
          required: ['restaurantId', 'name', 'price'],
          properties: {
            restaurantId: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number', format: 'float' },
            category: { type: 'string' },
            imageUrl: { type: 'string' }
          }
        },

        // --- Comment Schemas ---
        Comment: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            reviewId: { type: 'string' },
            userId: { type: 'string' },
            commentText: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        CommentCreate: {
          type: 'object',
          required: ['reviewId', 'userId', 'commentText'],
          properties: {
            reviewId: { type: 'string' },
            userId: { type: 'string' },
            commentText: { type: 'string' }
          }
        }
      }
    },

    // Apply JWT Security Globally
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};
