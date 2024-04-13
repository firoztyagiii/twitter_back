const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "User is required in order to follow someone"],
  },
  follow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "Follower is required in order to follow someone"],
  },
  followedAt: {
    type: Date,
    default: Date.now(),
  },
});

const FollowModel = mongoose.model("Followings", followSchema);

module.exports = FollowModel;
