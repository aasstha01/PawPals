const express = require('express');
const path = require('path');
const { uploadMultiple, handleUploadError } = require('../middleware/upload');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/upload
// @desc    Upload multiple images
// @access  Private
router.post('/', auth, (req, res) => {
  uploadMultiple(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, () => {});
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    // Generate URLs for uploaded files
    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      url: `/uploads/${file.filename}`
    }));

    res.json({
      success: true,
      message: `${req.files.length} file(s) uploaded successfully`,
      files: uploadedFiles
    });
  });
});

// @route   POST /api/upload/single
// @desc    Upload single image
// @access  Private
router.post('/single', auth, (req, res) => {
  const { uploadSingle } = require('../middleware/upload');

  uploadSingle(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, () => {});
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`
      }
    });
  });
});

// @route   DELETE /api/upload/:filename
// @desc    Delete uploaded file
// @access  Private
router.delete('/:filename', auth, (req, res) => {
  try {
    const fs = require('fs');
    const filePath = path.join(__dirname, '../uploads', req.params.filename);

    /