const AppError = require("../utils/AppError");

class BaseEntity {
  constructor(model) {
    this.model = model;
  }

  async findOne(query, projection, options) {
    const doc = await this.model.findOne(query, projection, options);
    if (!doc) return null;
    return doc;
  }

  async createOne(data) {
    try {
      const doc = await this.model.create(data);
      return doc;
    } catch (err) {
      throw err;
    }
  }

  async updateOne(query, updatePayload, options = {}) {
    try {
      const doc = await this.model.findOneAndUpdate(query, updatePayload, {
        ...options,
        new: true,
      });
      return doc;
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(query) {
    try {
      await this.model.findOneAndDelete(query);
    } catch (err) {
      throw err;
    }
  }

  async findMany(searchQuery, PAGE = 1, populate) {
    try {
      const TOTAL_DOCS = await this.model.countDocuments(searchQuery);
      if (TOTAL_DOCS) {
        const LIMIT = 10;
        const MAX_PAGES = Math.ceil(TOTAL_DOCS / LIMIT);

        if (PAGE > MAX_PAGES) {
          throw new AppError("Maximum page number exceeded", 400);
        }

        const SKIP = PAGE > 1 ? PAGE - 1 * LIMIT : 0;
        const query = this.model.find(searchQuery);
        query.skip(SKIP).limit(LIMIT);
        if (populate) {
          query.populate(populate);
        }
        return query;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BaseEntity;
