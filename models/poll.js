const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

const PollSchema = new mongoose.Schema({
  name: String,
  items: [
    {
      name: String,
      count: Number
    }
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

PollSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Poll", PollSchema);
