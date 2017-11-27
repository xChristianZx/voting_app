const express = require("express"),
  bodyParser = require("body-parser"),
  app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/poll", (req, res) => {
  res.render("poll");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/secret", (req, res) => {
  res.render("secret");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
