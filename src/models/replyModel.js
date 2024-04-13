const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Content is required to reply"],
  },
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweets",
    required: [true, "Tweet is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: Number,
    default: 0,
  },
  replies: {
    type: Number,
    default: 0,
  },
  retweet: {
    type: Number,
    default: 0,
  },
  media: {
    type: String,
  },
});

const ReplyModel = mongoose.model("Reply", replySchema);

module.exports = ReplyModel;
