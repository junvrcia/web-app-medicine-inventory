// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serves the frontend files

// EMAIL CONFIGURATION
// Ideally, use environment variables (process.env) for security
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred email provider
    auth: {
user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS  // REPLACE WITH YOUR APP PASSWORD
    }
});

// Registration Route
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // 1. Basic Validation
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please fill in all fields.' });
    }

    // 2. Database Simulation (In a real app, you would save to MongoDB/MySQL here)
    console.log(`New user registered: ${email}`);

    // 3. Send Email Notification
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Registration Successful!',
        text: `Welcome! Your account with email ${email} has been successfully created.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Registration successful, but email failed to send.' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.json({ success: true, message: 'Registration successful! Check your email.' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});