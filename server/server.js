const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const videoRoutes = require('./routes/videoRoutes');
const authRoutes = require('./routes/authRoutes')
const path = require("path");
require('dotenv').config();

const cors = require('cors');


const app = express();
app.use(cors());
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/videos', videoRoutes);
app.use('/api/auth', authRoutes);
// Connect to database and start server


//build folder path
app.use(express.static(path.join(__dirname, "build")));

// index file path
app.get("/*", (req, res) => {
  return res.status(200).sendFile(__dirname + "/build/index.html");
});

app.get("/", (req, res) => {
  return res.status(200).sendFile(__dirname + "/build/index.html");
});


const startServer = async () => {
  const db = await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
