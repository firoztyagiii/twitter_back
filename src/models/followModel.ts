import mongoose, { Schema } from "mongoose";
import userEntity from "../entity/userEntity";

const followSchema = new mongoose.Schema<IFollow.FollowDocument>({
  userId: {
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
  followSchema
);

export default FollowModel;
