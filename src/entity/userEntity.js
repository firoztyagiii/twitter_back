const AppError = require("../utils/AppError");

const UserModel = require("../models/userModel");
const FollowModel = require("../models/followModel");

const BaseEntity = require("./baseEntity");

class UserEntity extends BaseEntity {
  constructor(model) {
    super(model);
  }

  async findUserById(userId) {
    try {
      const user = await this.model
        .findOne({ _id: userId })
        .select("-email -password");
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findByUsername(username) {
    try {
      const user = await this.model.findOne(
        { username: username },
        { active: false }
      );
      if (!user) {
        return null;
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  async addFollow(userId, follow) {
    try {
      await this.model.findOneAndUpdate(
        { _id: userId },
        { $inc: { followings: 1 } }
      );
      await this.model.findByIdAndUpdate(
        { _id: follow },
        { $inc: { followers: 1 } }
      );
    } catch (err) {
      throw err;
    }
  }

  async removeFollow(userId, follow) {
    try {
      await this.model.findOneAndUpdate(
        { _id: userId },
        { $inc: { followings: -1 } }
      );
      await this.model.findByIdAndUpdate(
        { _id: follow },
        { $inc: { followers: -1 } }
      );
    } catch (err) {
      throw err;
    }
  }

  async getTimeline(userId, page = 1) {
    try {
      const following = await followEntity.getFollowers(userId, page);
      if (!following) {
        return null;
      }

      const latestTweets = await Promise.all(
        following.map((item) => {
          return tweetEntity.getLatestTweet(item.follow.toString());
        })
      );

      if (!latestTweets[0]) {
        return [];
      }

      return latestTweets;
    } catch (err) {
      throw err;
    }
  }
}

const userEntity = new UserEntity(UserModel);

module.exports = userEntity;
