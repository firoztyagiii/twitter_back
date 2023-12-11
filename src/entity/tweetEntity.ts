import TweetModel from "../models/tweetModel";
import AppError from "../utils/AppError";
import BaseEntity from "./baseEntity";

import { FilterQuery, Model, ProjectionType, QueryOptions } from "mongoose";

class TweetEntity<T, D> extends BaseEntity<T, D> {
  constructor(protected model: Model<D>) {
    super(model);
  }

  async find(
    filter: FilterQuery<D>,
    projection?: ProjectionType<D>,
    options?: QueryOptions<D>
  ) {
    try {
      const tweets = await this.model.find(
        filter,
        projection || {},
        options || {}
      );
      return tweets;
    } catch (err) {
      throw err;
    }
  }

  async findOne(
    query: FilterQuery<T>,
    projection: ProjectionType<T> = {},
    options: QueryOptions<T> = {}
  ): Promise<D | null> {
    try {
      const doc = await this.model
        .findOne(query, projection, options)
        .populate({
          path: "user",
          select: {
            password: false,
            email: false,
          },
        });
      if (!doc) {
        throw new AppError("No tweet found for this ID", 404);
      }
      return doc as D;
    } catch (err) {
      throw err;
    }
  }

  async addLike(tweetId: string) {
    try {
      await this.updateOne({ _id: tweetId }, { $inc: { likes: 1 } });
    } catch (err) {
      throw err;
    }
  }

  async removeLike(tweetId: string) {
    try {
      await this.updateOne({ _id: tweetId }, { $inc: { likes: -1 } });
    } catch (err) {
      throw err;
    }
  }

  async addReply(tweetId: string) {
    try {
      await this.updateOne({ _id: tweetId }, { $inc: { replies: 1 } });
    } catch (err) {
      throw err;
    }
  }
  async getLatestTweet(userId: string): Promise<D> {
    try {
      const tweet = await this.model
        .find({ user: userId })
        .sort({ _id: -1 })
        .limit(1)
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

const tweetEntity = new TweetEntity<ITweet.Tweet, ITweet.TweetDocument>(
  TweetModel
);

export default tweetEntity;
