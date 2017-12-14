const express = require("express");
const router = express.Router();
const passport = require("passport");
const Poll = require("../models/poll");
const middleware = require("../middleware/middleware");
const Chart = require("chart.js");

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
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("poll/new");
});

//SHOW
router.get("/:id", (req, res) => {
  Poll.findById(req.params.id).exec((err, foundPoll) => {
    if (err || !foundPoll) {
      req.flash("error", "Poll not found");
      res.redirect("back");
    } else {
      res.render("poll/show", { poll: foundPoll, Chart: Chart });
    }
  });
});

//VOTE
router.put("/:id", (req, res) => {
  // console.log("Updated ID:", req.params);
  // console.log("Updated Poll:", req.body);
  // console.log("Voted Item:", req.body.item);

  const votedItem = req.body.item;
  Poll.update(
    { "items._id": votedItem },
    {
      $inc: { "items.$.count": 1 }
    },
    (err, updatedPoll) => {
      if (err) throw err;
      res.redirect(`/poll/${req.params.id}`);
    }
  );
});

//Create new Poll
router.post("/", (req, res) => {
  const name = req.body.pollName;
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
    pollName: name,
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

// EDIT Poll
router.get("/:id/edit", middleware.checkPollOwnership, (req, res) => {
  Poll.findById(req.params.id, (err, foundPoll) => {
    if (err) throw err;
    res.render("poll/edit", { poll: foundPoll });
  });
});

// UPDATE Poll
router.put("/:id/edit", (req, res) => {
  console.log("Updated ID:", req.params);
  console.log("Updated Poll:", req.body.poll);
  Poll.findByIdAndUpdate(req.params.id, req.body.poll, (err, updatedPoll) => {
    if (err) throw err;
    res.redirect(`/poll`);
  });
});

// DELETE Poll
router.delete("/:id", middleware.checkPollOwnership, (req, res) => {
  Poll.findByIdAndRemove(req.params.id, err => {
    if (err) throw err;
    res.redirect("/poll");
  });
});

module.exports = router;
