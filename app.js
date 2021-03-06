require("dotenv").config();

const express = require("express");
const hbs = require("hbs");
const logger = require("morgan");
const createError = require("http-errors");

const { sendMessageAck } = require("./config/mailer.config");

// Express config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(logger("dev"));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");


// App routes
app.get("/", (req, res, next) => {
  res.render("home");
});

app.post("/contact", (req, res, next) => {
  // 1. Send validation email
  const { email, subject } = req.body;
  sendMessageAck(email, subject);

  // 2. Render screen letting the user know they'll receive an email
  res.render("home", { ...req.body, message: "⭐ We'll get in touch soon ⭐" });
});


// Error 404 generator
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((error, req, res, next) => {
  console.log(error);
  if (!error.status) {
    error = createError(500);
  }
  res.status(error.status);
  res.render("error", error);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
