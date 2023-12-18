export as namespace ITweet;

import { Types, Document } from "mongoose";

interface Tweet {
  user: Types.ObjectId;
  content: string;
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
}
