// Load environment variables first — only once!
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;

// Debugging .env file — optional, for development only
//console.log('Raw .env file:');
//console.log(fs.readFileSync(path.resolve(__dirname, '.env'), 'utf-8'));

//console.log('MONGODB_URI from process.env:', process.env.MONGODB_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Optional: stop the server if DB connection fails
  });
