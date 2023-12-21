const authService = require('../services/authService');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authService.register(username, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  register
};