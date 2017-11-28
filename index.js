const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/user");

const app = express();
mongoose.connect("mongodb://localhost/voting_app", { useMongoClient: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//HOME
app.get("/", (req, res) => {
  res.render("home");
});

//POLL
app.get("/poll", (req, res) => {
  res.render("poll");
});

//LOGIN
app.get("/login", (req, res) => {
  res.render("login");
});

//REGISTER
app.get("/register", (req, res) => {
  res.render("register");
});

//Create New User
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = {
    username: username,
    password: password
  };

  User.create(newUser, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      console.log(` You have been registered ${newlyCreated.username}`);
      res.redirect("/");
    }
  });
});

app.get("/secret", (req, res) => {
  res.render("secret");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
