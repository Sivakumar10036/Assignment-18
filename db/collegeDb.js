const mongoose = require('mongoose');

const MONGODB_URI = process.env.COLLEGE_MONGODB_URI || 'mongodb://localhost:27017';

const collegeDb = mongoose.createConnection(MONGODB_URI)
  .on('connected', () => console.log('Successfully connected to College MongoDB'))
  .on('error', err => console.error('College MongoDB connection error:', err));

module.exports = collegeDb;