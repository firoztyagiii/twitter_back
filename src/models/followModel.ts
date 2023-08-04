import mongoose, { Schema } from "mongoose";

const followingSchema = new mongoose.Schema<IFollower.FollowingDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "User is required in order to follow someone"],
  },
  follow: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "Follower is required in order to follow someone"],
  },
  followedAt: {
    type: Date,
    default: Date.now(),
  },
});

const FollowingModel = mongoose.model("Followings", followingSchema);

export default FollowingModel;
