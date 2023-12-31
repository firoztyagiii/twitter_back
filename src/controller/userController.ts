import { Request, Response, NextFunction } from "express";

import userEntity from "../entity/userEntity";
import signToken from "../utils/signToken";
import comparePassword from "../utils/comparePassword";
import AppError from "../utils/AppError";
import likeEntity from "../entity/likeEntity";
import { time } from "console";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, username, password, confirmPassword } = req.body;
    const user = await userEntity.createOne({
      name,
      email,
      username,
      password,
      confirmPassword,
    });
    const token = await signToken(user);
    // TODO: set cookies
    res.cookie("token", token, {
      expires: new Date(60 * 1000 * 60 * 60),
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod" ? true : false,
    });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(201).json({
      status: "success",
      token,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await userEntity.findOne({ email: email });
    if (!user) {
      return next(new AppError("Invalid user credentials", 400));
    }

    const isPassCorrect = await comparePassword(user.password, password);
    if (!isPassCorrect) {
      return next(new AppError("Invalid credentials", 400));
    }

    const token = await signToken(user);

    res.cookie("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      secure: false,
    });

    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(200).json({
      status: "success",
      data: {
        token,
        user: {
          name: user.name,
          username: user.username,
          image: user.image,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie("token", " ");
    res.status(200).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.params;
    const user = await userEntity.findByUsername(username);
    if (!user) {
      return next(new AppError("Could not find the user", 404));
    }
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

const aboutMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals._id;
    const user = await userEntity.findUserById(userId);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const timeline = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page } = req.params;
    const userId = res.locals._id;
    const timeline = await userEntity.getTimeline(userId, +page);

    const ids = timeline?.map((tweet) => {
      return tweet._id?.toString();
    });

    const liked = await likeEntity.findLikedTweets({
      tweetId: { $in: ids },
      userId: userId,
    });

    let newData: any = [];

    timeline?.forEach((tweet) => {
      if (liked?.length !== 0) {
        liked?.forEach((item) => {
          if (item.tweetId.toString() === tweet?._id?.toString()) {
            tweet.isLiked = true;
            newData.push(tweet);
          } else {
            tweet.isLiked = false;
            newData.push(tweet);
          }
        });
      } else {
        newData = timeline;
      }
    });

    res.status(200).json({
      status: "success",
      data: newData || null,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newPassword, currentPassword } = req.body;
    const user = await userEntity.findByUsername(res.locals.user.username);
    if (!user)
      throw new AppError("Cant find logged in user, please login again", 400);
    const isPassCorrect = await comparePassword(user.password, currentPassword);
    if (!isPassCorrect) throw new AppError("Incorrect password", 400);
    user.password = newPassword;
    user.confirmPassword = newPassword;
    await user.save();
    res.status(201).json({
      status: "success",
      message: "Password changed successfully.",
    });
  } catch (err) {
    next(err);
  }
};

const patchUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, name } = req.body;
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export {
  signUp,
  login,
  getUser,
  aboutMe,
  timeline,
  changePassword,
  patchUser,
  logout,
};
