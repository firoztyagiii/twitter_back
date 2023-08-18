import { Request, Response, NextFunction } from "express";
import likeEntity from "../entity/likeEntity";

const postAddLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals._id;
    const like = await likeEntity.addLike(
      req.body.tweetId || req.params.id,
      userId
    );
    res.status(201).json({
      status: "success",
      data: like,
    });
  } catch (err) {
    next(err);
  }
};

const postRemoveLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals._id;
    await likeEntity.removeLike(req.body.tweetId || req.params.id, userId);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

export { postAddLike, postRemoveLike };
