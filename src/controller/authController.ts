import { Request, Response, NextFunction } from "express";
import verifyToken from "../utils/verifyToken";
import AppError from "../utils/AppError";
import userEntity from "../entity/userEntity";
import comparePassword from "../utils/comparePassword";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string = "";
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return next(new AppError("Token not found, you are not logged in", 401));
    }
    const payload = await verifyToken(token);
    res.locals = payload;
    next();
  } catch (err) {
    next(err);
  }
};

const authorizeTo = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (err) {
      next(err);
    }
  };
};

const getUserByPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body;
    const { username } = req.params;
    const user = await userEntity.findByUsername(username);
    if (!user) {
      throw new AppError("No user found", 400);
    }
    const isPasswordCorrect = await comparePassword(user.password, password);

    if (!isPasswordCorrect) {
      throw new AppError("Invalid password", 400);
    }

    user.password = "";

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export { protect, authorizeTo, getUserByPassword };
