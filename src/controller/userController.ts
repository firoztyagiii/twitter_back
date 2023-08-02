import { Request, Response, NextFunction } from "express-serve-static-core";

const signUp = (req: Request, res: Response, next: NextFunction) => {
  console.log("handeling singup");
};

export { signUp };
