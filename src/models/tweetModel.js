const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  content: {
    type: String,
    maxLength: [160, "Content is max 160 lengths"],
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  repost: {
    type: Boolean,
  },
  repostedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  originalTweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweets",
  },
  type: {
    type: String,
    enum: ["tweet", "reply", "retweet"],
  },
});

const TweetModel = mongoose.model("Tweets", tweetSchema);

module.exports = TweetModel;
