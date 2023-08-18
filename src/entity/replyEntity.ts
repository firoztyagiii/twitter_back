import BaseEntity from "./baseEntity";
import ReplyModel from "../models/replyModel";

import { Model } from "mongoose";

class ReplyEntity<T, D> extends BaseEntity<T, D> {
  constructor(protected model: Model<D>) {
    super(model);
  }
}

const replyEntity = new ReplyEntity<IReply.Reply, IReply.ReplyDocument>(
  ReplyModel
);

export default replyEntity;
