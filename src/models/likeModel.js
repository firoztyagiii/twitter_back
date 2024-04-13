const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  likedAt: {
    type: Number,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const LikeModel = mongoose.model("Likes", likeSchema);

module.exports = LikeModel;
