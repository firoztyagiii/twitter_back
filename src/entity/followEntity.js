const FollowModel = require("../models/followModel");
const AppError = require("../utils/AppError");

const BaseEntity = require("./baseEntity");

class FollowEntity extends BaseEntity {
  constructor(model) {
    super(model);
    this.model = model;
  }

  async addFollow(userId, userTo) {
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
      });
      return followDoc;
    } catch (err) {
      throw err;
    }
  }

  async removeFollow(userId, userTo) {
    try {
      await this.model.findOneAndDelete({
        $and: [{ userId }, { follow: userTo }],
      });
    } catch (err) {
      throw err;
    }
  }

  async getFollowers(id, page = 1) {
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

  async isFollowed(userID, followID) {
    try {
      const follow = await this.findOne({ userId: userID, follow: followID });
      return follow ? true : false;
    } catch (err) {
      throw err;
    }
  }
}

const followEntity = new FollowEntity(FollowModel);

module.exports = followEntity;
