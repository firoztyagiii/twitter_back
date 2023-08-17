import followEntity from "../entity/followEntity";
import { Request, Response, NextFunction } from "express";

const follow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals._id;
    const { userTo } = req.params;
    const followDoc = await followEntity.addFollow(user, userTo);
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
    const user = res.locals._id;
    const { userTo } = req.params;
    await followEntity.removeFollow();
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
    const id = res.locals._id;
    const { page } = req.params;
    const followers = await followEntity.getFollowers(id, +page);
    res.status(200).json({
      status: "success",
      data: {
        followers,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getFollowings = async () => {};

export { follow, unfollow, getFollowers, getFollowings };
