import { Request, Response, NextFunction } from "express";

import userEntity from "../entity/userEntity";
import signToken from "../utils/signToken";
import comparePassword from "../utils/comparePassword";
import AppError from "../utils/AppError";

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
      expires: new Date(60 * 1000 * 60 * 60),
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod" ? true : false,
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

export { signUp, login };
