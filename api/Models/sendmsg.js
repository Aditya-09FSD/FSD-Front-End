const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // To allow cross-origin requests
app.use(bodyParser.json()); // To parse JSON body in the request

// POST route to handle the contact form submission
app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Create a transporter object using your email service (Gmail in this case)
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com", // Replace with your email address
      pass: "your-email-password", // Replace with your email password or app password
    },
  });

  // Set up email data
  let mailOptions = {
    from: email, // Sender's email address
    to: "your-email@example.com", // Receiver's email address
    subject: "New Message from Contact Form",
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
