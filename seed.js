const mongoose = require("mongoose"),
  Poll = require("./models/poll");

const data = [
  {
    name: "Best Soda",
    items: [
      { name: "Coke", count: "1" },
      { name: "Sprite", count: "2" },
      { name: "Dr. Pepper", count: "3" },
      { name: "Root Beer", count: "4" }
    ]
  }
  //   {
  //     name: "Best Hero",
  //     items: [
  //       { name: "Superman", count: "0" },
  //       { name: "Batman", count: "0" },
  //       { name: "Catwoman", count: "0" },
  //       { name: "Spiderman", count: "0" }
  //     ]
  //   },
  //   {
  //     name: "Best Sandwich",
  //     items: [
  //       { name: "Reuben", count: "0" },
  //       { name: "Turkey & Avocado", count: "0" },
  //       { name: "Ham", count: "0" },
  //       { name: "Tuna", count: "0" }
  //     ]
  //   }
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
