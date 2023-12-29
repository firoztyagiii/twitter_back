import { boolean } from "joi";
import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema<ITweet.TweetDocument>({
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
  originalTweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweets",
  },
});

const TweetModel = mongoose.model<ITweet.TweetDocument>("Tweets", tweetSchema);

export default TweetModel;
