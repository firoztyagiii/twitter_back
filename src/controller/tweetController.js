const tweetEntity = require("../entity/tweetEntity");
const likeEntity = require("../entity/likeEntity");
const AppError = require("../utils/AppError");

exports.postTweet = async (req, res, next) => {
  try {
    const { content } = req.body;
    const userId = res.locals._id;

    const tweet = await tweetEntity.createOne({
      user: userId,
      content,
      media: res.locals.imageFileName,
      type: "tweet",
    });

    res.status(201).json({
      status: "success",
      data: tweet,
    });
  } catch (err) {
    next(err);
  }
};

exports.postRetweet = async (req, res, next) => {
  try {
    const userId = res.locals._id;
    const tweetId = req.params.id;

    const retweet = await tweetEntity.createOne({
      repost: true,
      repostedBy: userId,
      originalTweet: tweetId,
      type: "retweet",
    });
    await tweetEntity.addRepost(tweetId);

    res.status(201).json({
      status: "success",
      data: retweet,
    });
  } catch (err) {
    next(err);
  }
};

exports.postReply = async (req, res, next) => {
  try {
    const userId = res.locals._id;
    const tweetId = req.params.id;
    const { content } = req.body;

    const retweet = await tweetEntity.createOne({
      type: "reply",
      content,
      repliedBy: userId,
      originalTweet: tweetId,
    });

    await tweetEntity.addReply(tweetId);

    res.status(201).json({
      status: "success",
      data: retweet,
    });
  } catch (err) {
    next(err);
  }
};

exports.postLike = async (req, res, next) => {
  try {
    const userId = res.locals._id;
    const tweetId = req.params.id;

    await likeEntity.addLike(tweetId, userId);
    const likedTweet = await tweetEntity.addLike(tweetId);

    res.status(201).json({
      status: "success",
      data: likedTweet,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteLike = async (req, res, next) => {
  try {
    const userId = res.locals._id;
    const tweetId = req.params.id;

    await likeEntity.removeLike(tweetId, userId);

    await tweetEntity.removeLike(tweetId);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

exports.getTweets = async (req, res, next) => {
  try {
    const tweets = await tweetEntity.getUserTweets(res.locals._id);

    res.status(200).json({
      status: "success",
      data: {
        total: tweets.length,
        docs: tweets,
      },
      pagination: "WILL BE ADDED",
    });
  } catch (err) {
    next(err);
  }
};

exports.getTweet = async (req, res, next) => {
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

exports.getLatestTweet = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const latestTweet = await tweetEntity.getLatestTweet(userId);

    res.status(200).json({
      status: "success",
      data: latestTweet || null,
    });
  } catch (err) {
    next(err);
  }
};

exports.postRepost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tweet = await tweetEntity.findOne({ _id: id });

    if (!tweet) {
      throw new AppError("No tweet found for repost", 400);
    }

    const retweet = {
      repost: true,
      repostedBy: res.locals._id,
      originalTweet: tweet._id,
    };

    const isAllowed = await tweetEntity.isAllowedToRepost(id, res.locals._id);

    if (!isAllowed) {
      throw new AppError("You have already retweeted this post.", 400);
    }

    const repost = await tweetEntity.createOne(retweet);

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

exports.getReplies = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page } = req.query;
    const replies = await tweetEntity.getReplies(id, page || 1);
    res.status(200).json({
      status: "success",
      data: replies,
    });
  } catch (err) {
    next(err);
  }
};
