const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Review = require('./src/models/Review');

dotenv.config({ path: './src/.env' });
// Fallback if .env is in root
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Yatree';

const seedReviews = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB for seeding...');

    // Clear existing
    await Review.deleteMany();

    const reviews = [
      {
        name: 'shivaani bhambure',
        rating: 5,
        text: "Travel experience with Yatree Destination was quite good. The cab - Ciaz was given to us which was very clean & well maintained throughout our tour. Driver Satishji was also very good by nature, he has a great knowledge Abt the city & It's...",
        avatar: 'https://ui-avatars.com/api/?name=shivaani+bhambure&background=0F172A&color=EAB308',
        createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
      }
    ];

    await Review.insertMany(reviews);
    console.log('Reviews seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedReviews();
