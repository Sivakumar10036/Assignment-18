const mongoose = require('mongoose');

const MONGODB_URI = process.env.SCHOOL_MONGODB_URI || 'mongodb://localhost:27017/';

const schoolDb = mongoose.createConnection(MONGODB_URI)
  .on('connected', () => console.log('Successfully connected to School MongoDB'))
  .on('error', err => console.error('School MongoDB connection error:', err));

module.exports = schoolDb;