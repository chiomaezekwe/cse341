const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('./db'); // connect to MongoDB
const userRoutes = require('./routes/userRoutes');
const PORT = 8080;

// Allow frontend to access backend
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes); // base URL for API routes
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
