export as namespace IReply;

import { Document, Types } from "mongoose";

export interface Reply {
  content: string;
  tweetId: Types.ObjectId | number;
  userId: Types.ObjectId;
}

export interface ReplyDocument extends Document, Reply {
  createAt: Date;
  likes: number;
  replies: number;
  retweet: number;
}
