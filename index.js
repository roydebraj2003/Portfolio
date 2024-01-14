import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import nodemailer from "nodemailer";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

app.post("/process-form", async (req, res) => {
  const { email, message } = req.body;

  // Validate input
  if (!email || !message) {
    return res.status(400).send('Invalid input');
  }

  try {
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

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.redirect('/');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send(`Error sending email: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
