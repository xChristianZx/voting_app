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
  res.send("Login page will be here");
});

app.get("/register", (req, res) => {
  res.send("Registration");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
