const tweetEntity = require("../entity/tweetEntity");
const AppError = require("../utils/AppError");

exports.postTweet = async (req, res, next) => {
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

exports.getTweets = async (req, res, next) => {
  try {
    const tweets = await tweetEntity.find({
      $or: [{ user: res.locals._id }, { repostedBy: res.locals._id }],
    });

    // const tweets = await tweetEntity.getUserTweets(res.locals._id);

    // const awaitedFetchedPromises = [];

    // const fetchedTweets = tweets.forEach((tweet) => {
    //   if (tweet.repost) {
    //     awaitedFetchedPromises.push();
    //   }
    // });

    res.status(200).json({
      status: "success",
      data: {
        total: tweets,
        docs: tweets,
      },
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
    throw err;
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
