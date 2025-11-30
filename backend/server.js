require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productsRoute = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI) // ⬅ removed extra options
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo error', err);
    process.exit(1);
  });
