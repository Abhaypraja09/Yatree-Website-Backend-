const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes for visitors
router.get('/', blogController.getAllBlogs);
router.get('/:slug', blogController.getBlog);

// Protected Admin Routes for management
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.post('/', blogController.createBlog);
router
  .route('/:id')
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
