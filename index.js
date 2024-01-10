import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.static(join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render(join(__dirname, "public", "index.ejs"));
});

app.post("/search", (req, res) => {
  const searchData = req.body["search"];
  res.redirect(`https://www.google.com/search?q=${encodeURIComponent(searchData)}`);
  console.log(searchData)
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

