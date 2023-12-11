export as namespace ITweet;

import { Types } from "mongoose";

interface Tweet {
  user: Types.ObjectId;
  content: string;
  media?: string;
}

interface TweetDocument extends Tweet, Document {
  likes: number;
  replies: number;
  retweet: number;
  createdAt: Date;
  media: string;
  _id: Types.ObjectId;
  isLiked?: boolean;
}
