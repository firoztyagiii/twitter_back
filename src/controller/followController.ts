import followEntity from "../entity/followEntity";
import { Request, Response, NextFunction } from "express";
import userEntity from "../entity/userEntity";

const follow = async (req: Request, res: Response, next: NextFunction) => {
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

const unfollow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals._id;
    const { userTo } = req.params;
    await followEntity.removeFollow(userId, userTo);
  } catch (err) {
    next(err);
  }
};

const getFollowers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals._id;
    const followers = await followEntity.findMany(
      { userId },
      req.query.page ? +req.query.page : 1
    );
    if (!followers) {
      return res.status(200).json({
        status: "success",
        data: followers,
      });
    }
    res.status(200).json({
      status: "success",
      data: followers,
    });
  } catch (err) {
    next(err);
  }
};

const getFollowings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

const getFollowedStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userEntity.findByUsername(req.params.username);
    // return;
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

export { follow, unfollow, getFollowers, getFollowings, getFollowedStatus };
