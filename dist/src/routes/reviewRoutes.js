const express = require('express');
const { getAllReviews, createReview } = require('../controllers/reviewController');

const router = express.Router();

router
  .route('/')
  .get(getAllReviews)
  .post(createReview);

module.exports = router;
