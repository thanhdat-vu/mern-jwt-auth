const nodemailer = require('nodemailer');

require('dotenv').config();

const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'no-reply@gmail.com',
      to: email,
      subject: 'Account Verification',
      html: `
        <h1>Welcome to my app</h1>
        <p>Please verify your account by clicking the link below</p>
        <a href="${process.env.CLIENT_URL}/verify/${token}">Verify Account</a>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + result.response);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendVerificationEmail,
};