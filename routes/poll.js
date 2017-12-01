const express = require("express");
const router = express.Router();
const passport = require("passport");
const Poll = require('../models/poll')

//POLL
router.get("/", (req, res) => {
  Poll.find({}, (err, allPolls) => {
    if (err) {
      console.log(err);
    } else {
      res.render("poll/poll", { polls: allPolls });
    }
  });
});
//New Poll Page
router.get("/new", (req, res) => {
  res.render("poll/new");
});

module.exports = router;