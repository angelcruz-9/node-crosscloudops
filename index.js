const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware to parse JSON data
app.use(cors());
app.use(bodyParser.json());

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: 'vijay.anand@crosscloudops.com',
    pass: 'rbyrfwtwvqmbyfap', // Use environment variables in production
  },
});

// Endpoint to handle form submission and send email
app.post('/send-email', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, message } = req.body;

  // Use the existing nodemailer configuration to send the email
  const mailOptions = {
    from: 'vijay.anand@crosscloudops.com',
    to: 'ravikumarcse123@gmail.com',
    subject: 'Contact Form Submission',
    html: `
      <p>You have a new contact form submission:</p>
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
