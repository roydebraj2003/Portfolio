import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import nodemailer from "nodemailer";

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable if set

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the "public" folder
app.use(express.static(join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

const gmailUser = "roydebrajmusic@gmail.com";
const gmailPass = "vrve lrks ycge tgbk";

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.post("/search", (req, res) => {
  const searchData = req.body["search"];
  res.redirect(`https://www.google.com/search?q=${encodeURIComponent(searchData)}`);
  console.log(searchData);
});

app.post("/process-form", (req, res) => {
  const email = req.body.email;
  const message = req.body.message;

  // Validate input
  if (!email || !message) {
    return res.status(400).send('Invalid input');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass
    }
  });

  const mailOptions = {
    from: gmailUser,
    to: 'roydebrajmusic@gmail.com',
    subject: 'New Message from Contact Form',
    text: `Email: ${email}\n\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send(`Error sending email: ${error.message}`);
    }

    console.log('Email sent:', info.response);
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
