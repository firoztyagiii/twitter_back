import mongoose, { Model } from "mongoose";
import followEntity from "./followEntity";

import UserModel from "../models/userModel";
import BaseEntity from "./baseEntity";
import AppError from "../utils/AppError";
import tweetEntity from "./tweetEntity";
import FollowModel from "../models/followModel";

class UserEntity<T, D> extends BaseEntity<T, D> {
  constructor(protected model: Model<D>) {
    super(model);
  }

  async findUserById(userId: string): Promise<D | null> {
    try {
      const user = await this.model
        .findOne({ _id: userId })
        .select("-email -password");
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findByUsername(username: string): Promise<D | null> {
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
  async addFollow(userId: string, follow: string) {
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
  async removeFollow(userId: string, follow: string) {
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

  async getTimeline(
    userId: string,
    page: number = 1
  ): Promise<ITweet.TweetDocument[] | null> {
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

const userEntity = new UserEntity<IUser.User, IUser.UserDocument>(UserModel);

export default userEntity;
