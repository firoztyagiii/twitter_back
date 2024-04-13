const likeEntity = require("../entity/likeEntity");

exports.postAddLike = async (req, res, next) => {
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

exports.postRemoveLike = async (req, res, next) => {
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
