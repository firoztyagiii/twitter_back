import { Request, Response, NextFunction } from "express";

const globalError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error --->", err);
  res.json(err);
};

export default globalError;
