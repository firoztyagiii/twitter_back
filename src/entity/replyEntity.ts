import BaseEntity from "./baseEntity";
import ReplyModel from "../models/replyModel";

import { Model, FilterQuery } from "mongoose";
import AppError from "../utils/AppError";

class ReplyEntity<T, D> extends BaseEntity<T, D> {
  constructor(protected model: Model<D>) {
    super(model);
  }

  async findMany(searchQuery: FilterQuery<D>, PAGE: number = 1): Promise<D[]> {
    try {
      const TOTAL_DOCS = await this.model.countDocuments(searchQuery);
      const LIMIT = 10;
      const MAX_PAGES = Math.ceil(TOTAL_DOCS / LIMIT);

      if (PAGE > MAX_PAGES) {
        throw new AppError("Maximum page number exceeded", 400);
      }

      const SKIP = PAGE > 1 ? PAGE - 1 * LIMIT : 0;
      const query = this.model.find(searchQuery);
      query.skip(SKIP).limit(LIMIT);
      return query;
    } catch (err) {
      throw err;
    }
  }
}

const replyEntity = new ReplyEntity<IReply.Reply, IReply.ReplyDocument>(
  ReplyModel
);

export default replyEntity;
