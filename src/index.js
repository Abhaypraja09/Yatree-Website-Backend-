const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

// const xss = require('xss-clean');
// const hpp = require('hpp');

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const blogRoutes = require('./routes/blogRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    // In development, allow any origin dynamically to support multiple local ports/IPs
    if (process.env.NODE_ENV === 'development' || !origin) {
      callback(null, true);
    } else {
      const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
      if (origin === clientUrl) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true
}));
// Body parser
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());

// Prevent parameter pollution
// app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000 // Increased for development and high-traffic event sites
});
app.use('/api', limiter);

// Static files serving
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/reviews', reviewRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log error for debugging
  console.error('ERROR 💥:', err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || 'Something went wrong on the server',
  });
});

// Serve frontend - Catch all routes and send to index.html
app.get(/.*/, (req, res) => {
  const indexPath = path.join(__dirname, '../public', 'index.html');
  
  // Check if file exists to prevent crash
  if (require('fs').existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend build (index.html) not found in server/public. Please run build:frontend and upload files.');
  }
});

// Database connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Yatree';
app.listen(PORT, () => {
  console.log(`🚀 Server starting on port ${PORT}...`);
});

const connectDB = async (retries = 5) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB (Yatree)');
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    if (retries > 0) {
      console.log(`Retrying in 5 seconds... (${retries} retries left)`);
      setTimeout(() => connectDB(retries - 1), 5000);
    } else {
      console.log('Could not connect to MongoDB. Please check your IP Whitelist on Atlas.');
      process.exit(1);
    }
  }
};

connectDB();
