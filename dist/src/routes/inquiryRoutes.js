const express = require('express');
const inquiryController = require('../controllers/inquiryController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public route to submit inquiry
router.post('/', inquiryController.createInquiry);

// Protected Admin Routes
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.get('/', inquiryController.getAllInquiries);
router
  .route('/:id')
  .patch(inquiryController.updateInquiry)
  .delete(inquiryController.deleteInquiry);

module.exports = router;
