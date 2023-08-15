import mongoose, { Model } from "mongoose";
import followEntity from "./followEntity";

import UserModel from "../models/userModel";
import BaseEntity from "./baseEntity";
import AppError from "../utils/AppError";

class UserEntity<T, D> extends BaseEntity<T, D> {
  constructor(protected model: Model<D>) {
    super(Model);
  }
  async findByUsername(username: string): Promise<D | null> {
    try {
      const user = await this.model.findOne(
        { username: username },
        { password: false, active: false }
      );
      if (!user) {
        return null;
      }
      return user;
    } catch (err) {
      throw err;
    }
  }
  async addFollowings(user: string, follow: string) {
    try {
      await this.model.findOneAndUpdate(
        { _id: user },
        { $inc: { followings: 1 } }
      );
      await this.model.findOneAndUpdate(
        { _id: follow },
        { $inc: { followers: 1 } }
      );
    } catch (err) {
      throw err;
    }
  }
}

const userEntity = new UserEntity<IUser.User, IUser.UserDocument>(UserModel);

export default userEntity;
