const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User with this email already exists' });
    const newUser = new User({ username, email, password });
    await newUser.save();
    const token = generateToken(newUser._id);
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  register,
};