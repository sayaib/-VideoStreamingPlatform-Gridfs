const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const connectDB = async () => {
  const conn = await mongoose.connect('mongodb://localhost:27017/mern-video-stream', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`);
  return conn.connection.db;
};

module.exports = connectDB;
