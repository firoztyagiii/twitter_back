import { Response, Request, NextFunction } from "express";
import tweetEntity from "../entity/tweetEntity";
import userEntity from "../entity/userEntity";

const postTweet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content } = req.body;
    const userId = res.locals._id;
    const tweet = await tweetEntity.createOne({
      user: userId,
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

const getLatestTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const latestTweet = await tweetEntity.getLatestTweet(userId);

    res.status(200).json({
      status: "success",
      data: latestTweet || null,
    });
  } catch (err) {
    throw err;
  }
};

export { postTweet, getTweets, getTweet, getLatestTweet };
