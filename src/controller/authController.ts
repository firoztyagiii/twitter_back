import { Request, Response, NextFunction } from "express";
import verifyToken from "../utils/verifyToken";
import AppError from "../utils/AppError";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string = "";
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      next(new AppError("Token not found, you are not logged in", 401));
    }
    const payload = await verifyToken(token);
    res.locals = payload;
    next();
  } catch (err) {
    next(err);
  }
};

export { protect };
