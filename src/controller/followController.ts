import { Request, Response, NextFunction } from "express";

const follow = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals._id;
    const { id } = req.params;
  } catch (err) {
    next(err);
  }
};

const unfollow = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params);
};

export { follow, unfollow };
