const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./route/authRoutes');
const animeRoutes = require('./route/animeRoutes');
const userRoutes = require('./route/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.use('/api/auth', authRoutes);
app.use('/api', animeRoutes);
app.use('/api/resource', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
