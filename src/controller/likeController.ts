import { Request, Response, NextFunction } from "express";
import likeEntity from "../entity/likeEntity";

const postAddLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals._id;
    const { tweetId } = req.params;
    const like = await likeEntity.addLike(tweetId, userId);
    res.status(201).json({
      status: "success",
      data: like,
    });
  } catch (err) {
    next(err);
  }
};

export { postAddLike };
