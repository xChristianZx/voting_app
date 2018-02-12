const Poll = require("../models/poll");

const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please login");
  res.redirect("/login");
};

middlewareObj.checkPollOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Poll.findById(req.params.id, (err, foundPoll) => {
      if (err || !foundPoll) {
        req.flash("error", "Poll not found");
        res.redirect("back");
      } else {
        if (foundPoll.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You do not have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
  }
};

module.exports = middlewareObj;
