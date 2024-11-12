const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 5000;

// Middleware to parse JSON data
app.use(cors());
app.use(bodyParser.json());

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'vijay.anand@crosscloudops.com',
    pass: 'rbyrfwtwvqmbyfap',
  },
});

app.post('/send-email', upload.single('file'), async (req, res) => {
  const { firstName, lastName, email, phoneNumber, message, location, jobTitle } = req.body;
  const file = req.file;

  let mailOptions;

  if (file) {
    mailOptions = {
      from: `${firstName} ${lastName} <${email}>`,
      to: ['info@crosscloudops.com', 'hr@crosscloudops.com'],
      subject: 'Career Form Submission',
      html: `
        <p>You have a new Career form submission:</p>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
      attachments: [
        {
          filename: file.originalname,
          content: file.buffer,
        },
      ],
       auth: {
        user: 'vijay.anand@crosscloudops.com', // SMTP authenticated user
      },
    };
  } else {
    mailOptions = {
      from: `${firstName} ${lastName} <${email}>`,
      to: ['info@crosscloudops.com', 'hr@crosscloudops.com'],
      subject: 'Contact Form Submission',
      html: `
        <p>You have a new contact form submission:</p>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
      `,
       auth: {
        user: 'vijay.anand@crosscloudops.com', // SMTP authenticated user
      },
    };
  }

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
