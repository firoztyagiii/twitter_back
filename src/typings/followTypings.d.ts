export as namespace IFollow;

import { Date, Document, Types } from "mongoose";

interface Follow {
  user: Types.ObjectId;
  follow: Types.ObjectId;
}

interface FollowDocument extends Follow, Document {
  followedAt: Date;
}
