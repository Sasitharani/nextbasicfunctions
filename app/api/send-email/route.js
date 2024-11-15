const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log("route of email hit");
  const { email, subject, body, attachmentPath, filename } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sasitharani@gmail.com', // Replace with your email
      pass: 'xwwhhaozejfdiavv', // Replace with your Google App Password
    },
  });

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Inshphile Enquiry form" <sasitharani@gmail.com>`, // Sender address
      to: email, // List of receivers
      subject: subject, // Subject line
      text: body, // Plain text body
      attachments: [
        {
          filename: filename, // Name of the file
          path: attachmentPath, // Path to the document
        },
      ],
    });

    console.log('Message sent: %s', info.messageId); // Debugging statement
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error); // Debugging statement
    res.status(500).json({ error: 'Error sending email' });
  }
});

module.exports = router;