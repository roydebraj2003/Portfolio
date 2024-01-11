import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import nodemailer from "nodemailer";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Set your Gmail credentials using environment variables
const gmailUser = process.env.GMAIL_USER || 'your-email@gmail.com';
const gmailPass = process.env.GMAIL_PASS || 'your-email-password';

app.get("/", (req, res) => {
  res.render(join(__dirname, "public", "index.ejs"));
});

app.post("/search", (req, res) => {
  const searchData = req.body["search"];
  res.redirect(`https://www.google.com/search?q=${encodeURIComponent(searchData)}`);
  console.log(searchData);
});

app.post("/process-form", (req, res) => {
  const email = req.body.email;
  const message = req.body.message;

  // Validate input (you may want to add more validation)
  if (!email || !message) {
    return res.status(400).send('Invalid input');
  }

  // Create a nodemailer transporter with Gmail credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "roydebrajmusic@gmail.com",
      pass: "vrve lrks ycge tgbk"
    }
  });

  // Configure the email options
  const mailOptions = {
    from: gmailUser,
    to: 'roydebrajmusic@gmail.com', // your email address
    subject: 'New Message from Contact Form',
    text: `Email: ${email}\n\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send(`Error sending email: ${error.message}`);
    }

    console.log('Email sent:', info.response);

    // Redirect to the main page on success
    res.redirect('/');
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
