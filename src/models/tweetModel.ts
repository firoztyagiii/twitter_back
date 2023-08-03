import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema<ITweet.TweetDocument>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "User is required to post a tweet"],
  },
  content: {
    type: String,
    required: [true, "Tweet content is required"],
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
});

const TweetModel = mongoose.model<ITweet.TweetDocument>("tweets", tweetSchema);

export default TweetModel;
