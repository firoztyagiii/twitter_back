const BaseEntity = require("./baseEntity");
const ReplyModel = require("../models/replyModel");

const { Model, FilterQuery } = require("mongoose");
const AppError = require("../utils/AppError");

class ReplyEntity extends BaseEntity {
  constructor(model) {
    super(model);
  }

  async findMany(searchQuery, PAGE = 1) {
    try {
      const TOTAL_DOCS = await this.model.countDocuments(searchQuery);
      if (TOTAL_DOCS) {
        const LIMIT = 10;
        const MAX_PAGES = Math.ceil(TOTAL_DOCS / LIMIT);

        if (PAGE > MAX_PAGES) {
          throw new AppError("Maximum page number exceeded", 400);
        }

        const SKIP = PAGE > 1 ? PAGE - 1 * LIMIT : 0;
        const query = this.model.find(searchQuery).populate({
          path: "user",
          select: "-password",
        });
        query.skip(SKIP).limit(LIMIT);
        return query;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  // async findMany(searchQuery, PAGE= 1): Promise<D[]> {
  //   try {
  //     const TOTAL_DOCS = await this.model.countDocuments(searchQuery);
  //     const LIMIT = 10;
  //     const MAX_PAGES = Math.ceil(TOTAL_DOCS / LIMIT);

  //     if (PAGE > MAX_PAGES) {
  //       throw new AppError("Maximum page number exceeded", 400);
  //     }

  //     const SKIP = PAGE > 1 ? PAGE - 1 * LIMIT : 0;
  //     const query = this.model.find(searchQuery);
  //     query.skip(SKIP).limit(LIMIT);
  //     return query;
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}

const replyEntity = new ReplyEntity(ReplyModel);

module.exports = replyEntity;
