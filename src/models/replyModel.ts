import mongoose from "mongoose";

const replySchema = new mongoose.Schema<IReply.ReplyDocument>({
  content: {
    type: String,
    required: [true, "Content is required to reply"],
  },
  tweetId: {
    type: mongoose.Schema.ObjectId,
    ref: "Tweets",
    required: [true, "Tweet is required"],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  likes: Number,
  replies: Number,
  retweet: Number,
});

const ReplyModel = mongoose.model("Reply", replySchema);

export default ReplyModel;
