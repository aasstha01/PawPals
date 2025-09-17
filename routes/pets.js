const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Pet = require('../models/Pet');
const User = require('../models/User');
const { auth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/pets
// @desc    Get all pets with filtering and search
// @access  Public
router.get('/', [
  query('category').optional().isIn(['all', 'dogs', 'cats', 'other', 'rescued']).withMessage('Invalid category'),
  query('location').optional().trim().isLength({ min: 1 }).withMessage('Invalid location'),
  query('type').optional().isIn(['dog', 'cat', 'bird', 'rabbit', 'fish', 'hamster', 'guinea pig', 'other']).withMessage('Invalid type'),
  query('size').optional().isIn(['Small', 'Medium', 'Large', 'Extra Large']).withMessage('Invalid size'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    // Build filter object
    const filter = { status: 'available' };

    // Category filter
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }

    // Location filter (case-insensitive partial match)
    if (req.query.location) {
      filter.location = { $regex: req.query.location, $options: 'i' };
    }

    // Type filter
    if (req.query.type) {
      filter.type = req.query.type;
    }

    // Size filter
    if (req.query.size) {
      filter.size = req.query.size;
    }

    // Search query (searches in name, breed, description)
    if (req.query.search) {
      const searchRegex = { $regex: req.quer