const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const middleware = require("../middleware/middleware");

// HOME
router.get("/", (req, res) => {
  res.render("home");
});

// REGISTER
router.get("/register", (req, res) => {
  res.render("register");
});

// REGISTER - Create New User
router.post("/register", (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const newUser = new User({ username });
  User.register(newUser, password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/poll");
    });
  });
});

// LOGIN
router.get("/login", (req, res) => {
  res.render("login");
});

// LOGIN-Authenticate
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/poll",
    successFlash: "Welcome",
    failureRedirect: "/login",
    failureFlash: true
  })
);

// LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You have been successfully logged out");
  res.redirect("/");
});

router.get("/secret", middleware.isLoggedIn, (req, res) => {
  res.render("secret");
});

module.exports = router;
