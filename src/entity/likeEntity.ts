import BaseEntity from "./baseEntity";
import LikeModel from "../models/likeModel";

import { Model } from "mongoose";

class LikeEntity<T, D> extends BaseEntity<T, D> {
  constructor(protected model: Model<D>) {
    super(model);
  }
}

const likeEntity = new LikeEntity<ILike.Like, ILike.LikeDocument>(LikeModel);

export default likeEntity;
