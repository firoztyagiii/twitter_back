import mongoose, { Schema } from "mongoose";

const followingSchema = new mongoose.Schema<IFollow.FollowDocument>({
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

const FollowModel = mongoose.model<IFollow.FollowDocument>(
  "Followings",
  followingSchema
);

export default FollowModel;
