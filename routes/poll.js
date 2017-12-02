const express = require("express");
const router = express.Router();
const passport = require("passport");
const Poll = require("../models/poll");

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

//Create new Poll
router.post("/", (req, res) => {
  const name = req.body.name;
  const items = req.body.item;
  console.log(req.body);
  console.log("items:", items);
  const itemsList = items.map(item => {
    return { name: item, count: 0 };
  });
  const author = {
    id: req.user._id,
    username: req.user.username
  };
  const newPoll = {
    name,
    items: itemsList,
    author
  };
  Poll.create(newPoll, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/poll");
    }
  });
});

module.exports = router;
