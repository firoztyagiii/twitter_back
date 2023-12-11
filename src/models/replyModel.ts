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
  user: {
    type: mongoose.Schema.ObjectId,
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

export default ReplyModel;
