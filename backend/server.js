require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const politicianRoutes = require('./routes/politician');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({ origin: 'https://politicians-portal1.vercel.app/', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/politician', politicianRoutes);

// Health check
app.get('/api/health', (req, res) =>
  res.json({ success: true, message: 'Server is running.' })
);

// 404 handler
app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Route not found.' })
);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ success: false, message: 'Internal server error.', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));