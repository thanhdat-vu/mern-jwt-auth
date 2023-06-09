const User = require('../models/user.model');
const { generateToken, verifyToken } = require('../utils/jwt');
const { sendVerificationEmail, sendResetPasswordEmail } = require('../utils/mailer');
const bcrypt = require('bcrypt');

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

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User with this email does not exist' });
    if (!user.isVerified) return res.status(400).json({ message: 'Please verify your email' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });
    const token = generateToken(user._id);
    res.status(200).json({ message: 'User logged in successfully', token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User with this email does not exist' });
    const token = generateToken(user._id);
    await sendResetPasswordEmail(email, token);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    res.status(200).json({ message: 'Reset password email sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const { id } = verifyToken(token);
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: 'User with this email does not exist' });
    if (user.resetPasswordExpires < Date.now()) return res.status(400).json({ message: 'Reset password token expired' });
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
};