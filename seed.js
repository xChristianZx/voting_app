const mongoose = require("mongoose"),
  Poll = require("./models/poll");

const data = [
  {
    name: "Best Soda",
    items: [
      { name: "Coke", count: 0 },
      { name: "Sprite", count: 0 },
      { name: "Dr. Pepper", count: 0 },
      { name: "Root Beer", count: 0 }
    ]
  }
];

const seedDB = () => {
  Poll.remove({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("removed polls");
      data.forEach(seed => {
        Poll.create(seed, (err, poll) => {
          if (err) {
            console.log(err);
          } else {
            console.log("added Poll");
            poll.save();
          }
        });
      });
    }
  });
};

module.exports = seedDB;