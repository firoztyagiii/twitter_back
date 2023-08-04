import { Request, Response, NextFunction } from "express";

const follow = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params);
};

export { follow };
