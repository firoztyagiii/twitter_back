import BaseEntity from "./baseEntity";
import FollowModel from "../models/followModel";
import { Model } from "mongoose";
import AppError from "../utils/AppError";

class FollowEntity<T, D> extends BaseEntity<T, D> {
  constructor(protected model: Model<D>) {
    super(model);
  }

  async addFollow(user: string, userTo: string): Promise<D> {
    try {
      const alreadyFollow = await this.findOne({
        $and: [{ user: user }, { follow: userTo }],
      });
      if (alreadyFollow) {
        throw new AppError("You already follow this user", 401);
      }
      const followDoc = await this.model.create({ user: user, follow: userTo });
      return followDoc;
    } catch (err) {
      throw err;
    }
  }

  async getFollowers(id: string, page: number) {
    try {
      const LIMIT = 10;
      const TOTALDOC = await this.model.countDocuments();
      const TOTALPAGES = TOTALDOC / LIMIT;

      if (page > TOTALPAGES) {
        return new AppError("Maximum page number exceeded", 401);
      }

      const query = this.model.find({ follow: id });
      query.skip(page - 1 * LIMIT);
      query.limit(LIMIT);
      return await query;
    } catch (err) {
      throw err;
    }
  }
}

const followEntity = new FollowEntity<IFollow.Follow, IFollow.FollowDocument>(
  FollowModel
);

export default followEntity;
