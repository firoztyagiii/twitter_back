import BaseEntity from "./baseEntity";
import LikeModel from "../models/likeModel";
import tweetEntity from "./tweetEntity";
import { Model } from "mongoose";
import AppError from "../utils/AppError";
import mongoose from "mongoose";

class LikeEntity<T, D> extends BaseEntity<T, D> {
  constructor(protected model: Model<D>) {
    super(model);
  }

  async addLike(tweetId: string, userId: string): Promise<D | null> {
    try {
      const alreadyLiked = await this.findOne({
        $and: [{ tweetId }, { userId }],
      });

      if (alreadyLiked) {
        throw new AppError("You have already liked this tweet", 400);
      }
      const tweet = new mongoose.Types.ObjectId(tweetId);
      const user = new mongoose.Types.ObjectId(userId);
      const like = await this.createOne({ tweetId: tweet, userId: user } as T);
      await tweetEntity.addLike(tweetId);
      return like as D;
    } catch (err) {
      throw err;
    }
  }
  async removeLike(tweetId: string, userId: string) {
    try {
      const liked = this.findOne({ $and: [{ tweetId }, { userId }] });
      if (!liked) {
        throw new AppError(
          "You never liked this tweet in the first place",
          400
        );
      }
      await this.deleteOne({ $and: [{ tweetId, userId }, {}] });
      await tweetEntity.removeLike(tweetId);
    } catch (err) {
      throw err;
    }
  }
}

const likeEntity = new LikeEntity<ILike.Like, ILike.LikeDocument>(LikeModel);

export default likeEntity;
