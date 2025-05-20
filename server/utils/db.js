const mongoose = require('mongoose');

const URL = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URL);
    console.log('mongodb is connected');
  } catch (error) {
    console.error('DataBase connection failed');
  }
};

module.exports = connectDb;
