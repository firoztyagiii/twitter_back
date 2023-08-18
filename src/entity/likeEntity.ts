import BaseEntity from "./baseEntity";
import LikeModel from "../models/likeModel";
import tweetEntity from "./tweetEntity";
import { Model } from "mongoose";
import AppError from "../utils/AppError";

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
        throw new AppError("You have already liked this tweet", 401);
      }
      const like = await this.model.create({ tweetId, userId });
      await tweetEntity.addLike(tweetId);
      return like as D;
    } catch (err) {
      throw err;
    }
  }
  async removeLike(tweetId: string, userId: string) {
    try {
      await this.deleteOne({ $and: [{ tweetId, userId }, {}] });
      await tweetEntity.removeLike(tweetId);
    } catch (err) {
      throw err;
    }
  }
}

const likeEntity = new LikeEntity<ILike.Like, ILike.LikeDocument>(LikeModel);

export default likeEntity;
