import BaseEntity from "./baseEntity";
import FollowModel from "../models/followModel";
import { Model } from "mongoose";

class FollowEntity<T, D> extends BaseEntity<T, D> {
  constructor(protected model: Model<D>) {
    super(model);
  }
}

const followEntity = new FollowEntity<IFollow.Follow, IFollow.FollowDocument>(
  FollowModel
);

export default followEntity;
