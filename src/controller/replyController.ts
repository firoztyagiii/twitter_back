import { Request, Response, NextFunction } from "express";
import replyEntity from "../entity/replyEntity";
import mongoose from "mongoose";
import tweetEntity from "../entity/tweetEntity";

const getReplies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tweetId } = req.params;
    const { page } = req.query;
    const replies = await replyEntity.findMany({ tweetId }, page ? +page : 1);
    res.status(200).json({
      status: "success",
      data: {
        replies,
      },
    });
  } catch (err) {
    next(err);
  }
};

const postReply = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals._id;
    const { content } = req.body;
    const tweetId = req.params.tweetId || req.body.tweetId;
    const data = {
      content,
      user: new mongoose.Types.ObjectId(userId),
      tweetId,
      media: res.locals.imageFileName,
    };

    const reply = await replyEntity.createOne(data);
    await tweetEntity.addReply(tweetId);

    res.status(201).json({
      status: "success",
      data: reply,
    });
  } catch (err) {
    next(err);
  }
};

export { postReply, getReplies };
