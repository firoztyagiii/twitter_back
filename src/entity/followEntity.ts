import BaseEntity from "./baseEntity";
import FollowModel from "../models/followModel";
import { Model } from "mongoose";
import AppError from "../utils/AppError";
import tweetEntity from "./tweetEntity";
import userEntity from "./userEntity";

class FollowEntity<T, D> extends BaseEntity<T, D> {
  constructor(protected model: Model<D>) {
    super(model);
  }

  async addFollow(userId: string, userTo: string): Promise<D> {
    try {
      const alreadyFollow = await this.findOne({
        $and: [{ userId: userId }, { follow: userTo }],
      });
      if (alreadyFollow) {
        throw new AppError("You already follow this user", 401);
      }
      const followDoc = await this.createOne({
        userId: userId,
        follow: userTo,
      } as T);
      await userEntity.addFollow(userId, userTo);
      return followDoc;
    } catch (err) {
      throw err;
    }
  }

  async removeFollow(userId: string, userTo: string) {
    try {
      await this.model.findOneAndDelete({
        $and: [{ userId }, { follow: userTo }],
      });
      await userEntity.removeFollow(userId, userTo);
    } catch (err) {
      throw err;
    }
  }

  async getFollowers(id: string, page: number = 1): Promise<D[] | null> {
    try {
      const LIMIT = 10;
      const TOTALDOC = await this.model.countDocuments({ userId: id });
      if (TOTALDOC === 0) {
        return null;
      }
      const TOTALPAGES = Math.ceil(TOTALDOC / LIMIT);
      if (page > TOTALPAGES) {
        throw new AppError("Maximum page number exceeded", 401);
      }

      const query = this.model.find({ userId: id });

      if (page) {
        query.skip(page - 1 * LIMIT);
      }
      query.limit(LIMIT);
      return await query;
    } catch (err) {
      throw err;
    }
  }

  async isFollowed(userID: string, followID: string) {
    try {
      const follow = await this.findOne({ userId: userID, follow: followID });
      return follow ? true : false;
    } catch (err) {
      throw err;
    }
  }
}

const followEntity = new FollowEntity<IFollow.Follow, IFollow.FollowDocument>(
  FollowModel
);

export default followEntity;
