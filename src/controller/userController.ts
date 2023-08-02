import { Request, Response, NextFunction } from "express";

import userEntity from "../entity/userEntity";
import signToken from "../utils/signToken";

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
    const token = await signToken({
      _id: user._id,
      user: {
        name: user.name,
        username: user.username,
        image: user.image,
      },
    });
    // TODO: set cookies
    // res.cookie("token", token, {
    //   expires: new Date(60 * 1000 * 60 * 60),
    //   httpOnly: true,
    // });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(201).json({
      status: "success",
      token,
    });
  } catch (err) {
    next(err);
  }
};

const login = (req: Request, res: Response, next: NextFunction) => {};

export { signUp, login };
