import { Model } from "mongoose";

import UserModel from "../models/userModel";
import BaseEntity from "./baseEntity";

class UserEntity<T, D> extends BaseEntity<T, D> {
  constructor(protected model: Model<D>) {
    super(Model);
  }
}

const userEntity = new UserEntity<IUser.User, IUser.UserDocument>(UserModel);

export default userEntity;
