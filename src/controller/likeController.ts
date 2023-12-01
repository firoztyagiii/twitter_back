import { Request, Response, NextFunction } from "express";
import likeEntity from "../entity/likeEntity";

const postAddLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals._id;
    const like = await likeEntity.addLike(
      req.params.tweetId || req.body.tweetId,
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
    await likeEntity.removeLike(req.params.tweetId || req.body.tweetId, userId);

    res.status(204).json({
      status: "success",
      message: "Like has been removed",
    });
  } catch (err) {
    next(err);
  }
};

export { postAddLike, postRemoveLike };
