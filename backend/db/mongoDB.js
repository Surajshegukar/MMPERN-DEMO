const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    const mongoose = require('mongoose');
    const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
    
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}

module.exports = {
  connectMongoDB,
};