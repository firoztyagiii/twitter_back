import { Response, Request, NextFunction } from "express";
import tweetEntity from "../entity/tweetEntity";

const postTweet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content } = req.body;
    const { _id } = res.locals;
    const tweet = await tweetEntity.createOne({
      user: _id,
      content,
    });
    res.status(201).json({
      status: "success",
      data: tweet,
    });
  } catch (err) {
    next(err);
  }
};

const getTweets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tweets = await tweetEntity.find({ user: res.locals._id });
    res.status(200).json({
      status: "success",
      data: {
        total: tweets.length,
        docs: tweets,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getTweet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const tweet = await tweetEntity.findOne({
      _id: id,
    });

    res.status(200).json({
      status: "success",
      data: {
        tweet,
      },
    });
  } catch (err) {
    next(err);
  }
};

const postAddLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
  } catch (err) {
    next(err);
  }
};

export { postTweet, getTweets, getTweet, postAddLike };
