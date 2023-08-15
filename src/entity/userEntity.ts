import { Model } from "mongoose";

import UserModel from "../models/userModel";
import BaseEntity from "./baseEntity";

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
}

const userEntity = new UserEntity<IUser.User, IUser.UserDocument>(UserModel);

export default userEntity;
