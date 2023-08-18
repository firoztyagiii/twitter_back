import { Request, Response, NextFunction } from "express";
import replyEntity from "../entity/replyEntity";

const postReply = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals._id;
    const { content } = req.body;
    const reply = await replyEntity.createOne({
      content,
      userId,
      tweetId: req.params.id || req.body.tweetId,
    });
    res.status(201).json({
      status: "success",
      data: reply,
    });
  } catch (err) {
    throw err;
  }
};

export { postReply };
