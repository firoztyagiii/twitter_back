import { Request, Response, NextFunction } from "express";

import userEntity from "../entity/userEntity";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const user = await userEntity.createOne({
      name,
      email,
      password,
      confirmPassword,
    });
    console.log(user);
  } catch (err) {
    next(err);
  }
};

export { signUp };
