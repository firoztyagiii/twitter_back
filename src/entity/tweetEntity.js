const TweetModel = require("../models/tweetModel");
const AppError = require("../utils/AppError");
const BaseEntity = require("./baseEntity");

const {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
} = require("mongoose");

class TweetEntity extends BaseEntity {
  constructor(model) {
    super(model);
  }

  async find(filter, projection, options) {
    try {
      const tweets = await this.model
        .find(filter, projection || {}, options || {})
        .populate({
          path: "user repostedBy originalTweet",
          select: "-password",
        });
      return tweets;
    } catch (err) {
      throw err;
    }
  }

  async getUserTweets(id) {
    const tweets = await tweetEntity.find({
      $or: [{ user: id }, { repostedBy: id }],
    });
    return tweets;
  }

  async findOne(query, projection = {}, options = {}) {
    try {
      const doc = await this.model.findOne(query).populate({
        path: "user",
        select: {
          password: false,
          email: false,
        },
      });
      // if (!doc) {
      //   throw new AppError("No tweet found for this ID ===========>", 404);
      // }
      return doc;
    } catch (err) {
      throw err;
    }
  }

  async isAllowedToRepost(tweetId, userId) {
    try {
      const repost = await this.findOne({
        originalTweet: tweetId,
        repostedBy: userId,
      });
      if (!repost) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      throw err;
    }
  }

  async addLike(tweetId) {
    try {
      await this.updateOne({ _id: tweetId }, { $inc: { likes: 1 } });
    } catch (err) {
      throw err;
    }
  }

  async checkRepost() {}

  async addRepost(tweetId) {
    try {
      const updatedDoc = await this.model.findOneAndUpdate(
        { _id: tweetId },
        { $inc: { retweet: 1 } }
      );
      console.log(updatedDoc);
    } catch (err) {
      throw err;
    }
  }

  async removeLike(tweetId) {
    try {
      await this.updateOne({ _id: tweetId }, { $inc: { likes: -1 } });
    } catch (err) {
      throw err;
    }
  }

  async addReply(tweetId) {
    try {
      await this.updateOne({ _id: tweetId }, { $inc: { replies: 1 } });
    } catch (err) {
      throw err;
    }
  }
  async getLatestTweet(userId) {
    try {
      const tweet = await this.model
        .find({ user: userId })
        .sort({ _id: -1 })
        .limit(1)
        .lean()
        .populate({
          path: "user",
          select: "-password -email",
        });

      return tweet[0];
    } catch (err) {
      throw err;
    }
  }
}

const tweetEntity = new TweetEntity(TweetModel);

module.exports = tweetEntity;
