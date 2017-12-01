const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//HOME
router.get("/", (req, res) => {
  res.render("home");
});

//REGISTER
router.get("/register", (req, res) => {
  res.render("register");
});

//REGISTER - Create New User
router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = {
    username: username,
    password: password
  };
  User.register(new User({ username }), password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/secret");
    });
  });
});

//LOGIN
router.get("/login", (req, res) => {
  res.render("login");
});

//LOGIN-Authenticate
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    successFlash: "Welcome",
    failureRedirect: "/login",
    failureFlash: true
  })
);

//LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You have been successfully logged out");
  res.redirect("/");
});

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  };

router.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret");
  });
  
  module.exports  = router;