export as namespace IReply;

import { Document, Types } from "mongoose";

export interface Reply {
  content: string;
  tweetId: Types.ObjectId;
  user: Types.ObjectId;
  media?: string;
}

export interface ReplyDocument extends Document, Reply {
  createAt: Date;
  likes: number;
  replies: number;
  retweet: number;
}
