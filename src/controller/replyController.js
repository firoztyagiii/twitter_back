const replyEntity = require("../entity/replyEntity");
const mongoose = require("mongoose");
const tweetEntity = require("../entity/tweetEntity");

exports.getReplies = async (req, res, next) => {
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

exports.postReply = async (req, res, next) => {
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
