const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  pollName: { type: String, required: true },
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

module.exports = mongoose.model("Poll", PollSchema);
