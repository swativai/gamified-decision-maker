require('dotenv').config();
const express = require('express');
// const connectDb = require('./utils/db');
const router = require('./router/auth-router');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;
app.use(cors());

//mongoDb database URL- mongodb+srv://swativaidya55:teenu1234@cluster0.cdd9v5e.mongodb.net/Gamified_Decision?retryWrites=true&w=majority&appName=Cluster0

mongoose
  .connect(
    'mongodb+srv://swativaidya55:teenu1234@cluster0.cdd9v5e.mongodb.net/Gamified_Decision?retryWrites=true&w=majority&appName=Cluster0',
  )
  .then(() => console.log('MongoDb is connected'))
  .catch((err) => console.log('MongoDb Error:', err));

app.use(express.json());

app.use('/api', router);

// connectDb().then(() => {
// });
app.listen(PORT, () => {
  console.log(`Server Started at Port:${PORT}`);
});
