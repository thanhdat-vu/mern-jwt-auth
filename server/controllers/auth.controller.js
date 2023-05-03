const User = require('../models/user.model');
const { generateToken, verifyToken } = require('../utils/jwt');
const { sendVerificationEmail } = require('../utils/mailer');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User with this email already exists' });
    const newUser = new User({ username, email, password });
    await newUser.save();
    const token = generateToken(newUser._id);
    await sendVerificationEmail(email, token);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const { id } = verifyToken(token);
    await User.findByIdAndUpdate(id, { isVerified: true });
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  register,
  verifyEmail,
};