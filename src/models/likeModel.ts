import mongoose from "mongoose";

const likeSchema = new mongoose.Schema<ILike.LikeDocument>({
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  likedAt: {
    type: Number,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const LikeModel = mongoose.model<ILike.LikeDocument>("Likes", likeSchema);

export default LikeModel;
