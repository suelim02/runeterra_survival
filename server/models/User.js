const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  social_id: String,
  nickname: String,
  email: String,
  gold: Number,
  character: [Number],
  items: [Number],
});

module.exports = mongoose.model("User", userSchema);
