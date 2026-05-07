const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');
const {
  createOrUpdateProfile,
  searchPoliticians,
  getPoliticianById,
  getMyProfile,
} = require('../controllers/politicianController');

// Public routes
router.get('/search', searchPoliticians);
router.get('/me', protect, getMyProfile);
router.get('/:id', getPoliticianById);

// Protected — politicians only
router.post('/create', protect, requireRole('politician'), createOrUpdateProfile);

module.exports = router;