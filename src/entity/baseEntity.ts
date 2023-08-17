import { FilterQuery, Model, ProjectionType, QueryOptions } from "mongoose";

class BaseEntity<T, D> {
  constructor(protected model: Model<D>) {}

  async findOne(
    query: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>
  ): Promise<D | null> {
    const doc = await this.model.findOne(query, projection, options);
    if (!doc) return null;
    return doc;
  }

  async createOne(data: T): Promise<D> {
    try {
      const doc = await this.model.create(data);
      return doc as D;
    } catch (err) {
      throw err;
    }
  }
  async updateOne(
    query: FilterQuery<T>,
    updatePayload: { [key: string]: any },
    options: QueryOptions<T> = {}
  ): Promise<D | null> {
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
}

export default BaseEntity;
