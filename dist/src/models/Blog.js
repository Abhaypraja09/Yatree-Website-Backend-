const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A blog must have a title'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'A blog must have a slug'],
    unique: true,
  },
  content: {
    type: String,
    required: [true, 'A blog must have content'],
  },
  excerpt: String,
  featuredImage: {
    type: String,
    default: '/default-blog.jpg',
  },
  category: {
    type: String,
    required: [true, 'A blog must have a category'],
  },
  tags: [String],
  author: {
    name: String,
    image: String,
  },
  seoTitle: String,
  metaDescription: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Blog', blogSchema);
