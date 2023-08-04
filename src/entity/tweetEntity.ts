import TweetModel from "../models/tweetModel";
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

  async findOne<K>(
    query: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>
  ): Promise<any> {
    const doc = await this.model.findOne(query, projection, options).populate({
      path: "user",
      select: {
        password: false,
        email: false,
      },
    });
    if (!doc) return null;
    return doc;
  }
}

const tweetEntity = new TweetEntity<ITweet.Tweet, ITweet.TweetDocument>(
  TweetModel
);

export default tweetEntity;
