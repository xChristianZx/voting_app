const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

const PollSchema = new mongoose.Schema({
  pollName: {type: String, required: true },
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
    username: { type: String }
  }
});

PollSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Poll", PollSchema);
