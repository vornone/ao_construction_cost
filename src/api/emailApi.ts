import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;


const senderInfo = {
    email: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
}


app.use(express.json());
app.use(cors()); // Enable CORS for React app

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or another email service
  auth: {
    user: 'vpanhavorn71@gmail.com',
    pass: 'some1hour',
  },
});

// POST route to handle form submission and send email
app.post('/send-email', async (req: Request, res: Response) => {
  const { email, name, message } = req.body;
  try {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'recipient-email@example.com',
      subject: `Message from ${name}`,
      text: `You have a new message from ${name} (${email}): \n\n${message}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
