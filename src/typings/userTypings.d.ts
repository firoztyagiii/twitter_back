export as namespace IUser;

import { Document } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserDocument extends User, Document {
  createdAt: number;
  active: boolean;
  image: string;
}
