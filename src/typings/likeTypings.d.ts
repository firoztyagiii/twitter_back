export as namespace ILike;

import { Document, Types } from "mongoose";

export interface Like {
  tweetId: Types.ObjectId;
}

export interface LikeDocument extends Document, Like {
  likedAt: number;
  user: Types.ObjectId;
}
