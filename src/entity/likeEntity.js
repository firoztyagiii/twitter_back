const BaseEntity = require("./baseEntity");
const LikeModel = require("../models/likeModel");
const tweetEntity = require("./tweetEntity");
const { FilterQuery, Model } = require("mongoose");
const AppError = require("../utils/AppError");
const mongoose = require("mongoose");

class LikeEntity extends BaseEntity {
  constructor(model) {
    super(model);
  }

  async addLike(tweetId, userId) {
    try {
      const alreadyLiked = await this.findOne({
        $and: [{ tweetId }, { userId }],
      });

      if (alreadyLiked) {
        throw new AppError("You have already liked this tweet", 400);
      }
      const tweet = new mongoose.Types.ObjectId(tweetId);
      const user = new mongoose.Types.ObjectId(userId);
      const like = await this.createOne({ tweetId: tweet, userId: user });
      return like;
    } catch (err) {
      throw err;
    }
  }
  async removeLike(tweetId, userId) {
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

  async findLikedTweets(searchFilter) {
    try {
      const likedTweets = await this.model.find(searchFilter);
      return likedTweets;
    } catch (err) {
      throw err;
    }
  }
}

const likeEntity = new LikeEntity(LikeModel);

module.exports = likeEntity;
