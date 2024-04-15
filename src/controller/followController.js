const followEntity = require("../entity/followEntity");
const userEntity = require("../entity/userEntity");

exports.follow = async (req, res, next) => {
  try {
    const userId = res.locals._id;
    const { userTo } = req.params;

    const followDoc = await followEntity.addFollow(userId, userTo);

    res.status(201).json({
      status: "success",
      data: followDoc,
    });
  } catch (err) {
    next(err);
  }
};

exports.unfollow = async (req, res, next) => {
  try {
    const userId = res.locals._id;
    const { userTo } = req.params;
    await followEntity.removeFollow(userId, userTo);
    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

exports.getFollowers = async (req, res, next) => {
  try {
    const userId = res.locals._id;
    const followers = await followEntity.findMany(
      { userId },
      req.query.page ? +req.query.page : 1
    );

    res.status(200).json({
      status: "success",
      data: followers,
    });
  } catch (err) {
    next(err);
  }
};

exports.getFollowings = async (req, res, next) => {
  try {
    const userId = res.locals._id;
    const followings = await followEntity.findMany(
      {
        follow: userId,
      },
      req.query.page ? +req.query.page : 1
    );
    res.status(200).json({
      status: "success",
      data: followings,
    });
  } catch (err) {
    next(err);
  }
};

exports.getFollowedStatus = async (req, res, next) => {
  try {
    const user = await userEntity.findByUsername(req.params.username);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "No user found.",
      });
    }
    const isFollowed = await followEntity.isFollowed(
      res.locals._id,
      user._id.toString()
    );
    res.status(200).json({
      status: "success",
      message: isFollowed,
    });
  } catch (err) {
    next(err);
  }
};
