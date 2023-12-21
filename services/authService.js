const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const config = require('../config/config');

const login = async (username, password) => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new Error('User not found');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, config.secret, { expiresIn: '1h' });

  return token;
};

const register = async (username, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });
  
      const token = jwt.sign({ userId: user.id }, config.secret, { expiresIn: '1h' });
  
      return token;
    } catch (error) {
      throw new Error('Registration failed. Username may already be in use.');
    }
  };
  
  module.exports = {
    login,
    register
  };