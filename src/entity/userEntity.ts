import mongoose, { Model } from "mongoose";
import followEntity from "./followEntity";

import UserModel from "../models/userModel";
import BaseEntity from "./baseEntity";
import AppError from "../utils/AppError";

class UserEntity<T, D> extends BaseEntity<T, D> {
  constructor(protected model: Model<D>) {
    super(Model);
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
  async addFollow(userId: string) {
    try {
      await this.model.findOneAndUpdate(
        { _id: userId },
        { $inc: { followings: 1 } }
      );
    } catch (err) {
      throw err;
    }
  }
  async removeFollow(userId: string) {
    try {
      await this.model.findOneAndUpdate(
        { _id: userId },
        { $inc: { followers: -1 } }
      );
    } catch (err) {
      throw err;
    }
  }
}

const userEntity = new UserEntity<IUser.User, IUser.UserDocument>(UserModel);

export default userEntity;
