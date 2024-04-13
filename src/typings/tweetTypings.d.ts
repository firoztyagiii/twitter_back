export as namespace ITweet;

import { Types, Document } from "mongoose";

enum TweetType {
  Tweet = "tweet",
  Reply = "reply",
  Repost = "repost",
}

interface Tweet {
  user?: Types.ObjectId;
  tweetType: TweetType;
  content?: string;
  media?: string;
  repost?: boolean;
  repostedBy?: Types.ObjectId;
}

interface TweetDocument extends Tweet, Document {
  likes: number;
  replies: number;
  retweet: number;
  createdAt: Date;
  media: string;
  _id?: Types.ObjectId;
  isLiked?: boolean;
  originalTweet?: Types.ObjectId;
}
