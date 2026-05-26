const Review = require('../models/Review');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      count: reviews.length,
      data: {
        reviews
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// @desc    Create new review
// @route   POST /api/reviews
// @access  Public
exports.createReview = async (req, res) => {
  try {
    // Basic formatting for avatar based on name if not provided
    const reviewData = { ...req.body };
    if (!reviewData.avatar && reviewData.name) {
      reviewData.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(reviewData.name)}&background=0F172A&color=EAB308`;
    }

    const newReview = await Review.create(reviewData);

    res.status(201).json({
      status: 'success',
      data: {
        review: newReview
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
