export as namespace IUser;

import { Document } from "mongoose";

export interface User {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface UserDocument extends User, Document {
  createdAt: number;
  active: boolean;
  image: string;
  confirmPassword: string | undefined;
  followings: number;
  followers: number;
}
