import { Request, Response, NextFunction } from "express";

const handleValidationError = (err: any, res: Response) => {
  let message: string[] = [];
  for (const error in err.errors) {
    message.push(err.errors[error].message);
  }
  res.status(400).json({
    status: "fail",
    message: message.join(", "),
  });
};

const globalError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ValidationError") {
    return handleValidationError(err, res);
  }
  // TODO: HANDLE DUPLICATE EMAIL AND USERNAME ERROR
  // console.log("Error --->", err);
  res.json(err);
};

export default globalError;
