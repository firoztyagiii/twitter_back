import mongoose, { Schema } from "mongoose";
import userEntity from "../entity/userEntity";

const followSchema = new mongoose.Schema<IFollow.FollowDocument>({
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

followSchema.post<IFollow.FollowDocument>(
  "save",
  async function (doc: IFollow.FollowDocument) {
    await userEntity.addFollowings(doc.user.toString(), doc.follow.toString());
  }
);

const FollowModel = mongoose.model<IFollow.FollowDocument>(
  "Followings",
  followSchema
);

export default FollowModel;
