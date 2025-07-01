const mongoose = require('mongoose');

const MONGODB_URI = process.env.HOSPITAL_MONGODB_URI || 'mongodb://localhost:27017';

const hospitalDb = mongoose.createConnection(MONGODB_URI)
  .on('connected', () => console.log('Successfully connected to Hospital MongoDB'))
  .on('error', err => console.error('Hospital MongoDB connection error:', err));

module.exports = hospitalDb;