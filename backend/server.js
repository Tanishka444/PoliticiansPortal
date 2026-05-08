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
// Allow the deployed frontend and local dev origin. FRONTEND_URL can be set in environment.
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://politicians-portal1.vercel.app'
const allowedOrigins = [FRONTEND_URL, 'http://localhost:5173']
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('CORS policy: Origin not allowed'))
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/politician', politicianRoutes);
// Also accept non-prefixed routes to be forgiving for clients calling root paths
app.use('/auth', authRoutes);
app.use('/politician', politicianRoutes);

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