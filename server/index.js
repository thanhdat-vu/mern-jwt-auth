const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth.route.js');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (_, res) => {
  res.send('Server is running');
});
app.use('/api/auth', authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
