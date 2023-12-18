import { Response, Request, NextFunction } from "express";
import tweetEntity from "../entity/tweetEntity";
import userEntity from "../entity/userEntity";
import saveImage from "../utils/saveImage";
import AppError from "../utils/AppError";

const postTweet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content } = req.body;
    const userId = res.locals._id;

    const tweet = await tweetEntity.createOne({
      user: userId,
      content,
      media: res.locals.imageFileName,
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
    const tweets = await tweetEntity.find({
      $or: [{ user: res.locals._id }, { repostedBy: res.locals._id }],
    });

    // const awaitedFetchedPromises = [];

    // const fetchedTweets = tweets.forEach((tweet) => {
    //   if (tweet.repost) {
    //     awaitedFetchedPromises.push();
    //   }
    // });

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

const postRepost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const tweet = await tweetEntity.findOne({ _id: id });
    if (!tweet) {
      throw new AppError("No tweet found for repost", 400);
    }
    delete tweet._id;
    const repost = await tweetEntity.createOne({
      ...tweet,
      repost: true,
      repostedBy: res.locals._id,
    });

    await tweetEntity.addRepost(id);

    res.status(201).json({
      status: "success",
      data: repost,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export { postTweet, getTweets, getTweet, getLatestTweet, postRepost };
