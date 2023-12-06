import { Request, Response, NextFunction } from "express";
import Joi from "joi";

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

const handleJoiValidationError = (err: Joi.ValidationError, res: Response) => {
  let message: string[] = [];
  for (const key of err.details) {
    message.push(key.message);
  }
  res.status(400).json({
    status: "fail",
    message: message.join(", "),
  });
};

const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ValidationError" && err.isJoi) {
    return handleJoiValidationError(err, res);
  }

  if (err.name === "ValidationError") {
    return handleValidationError(err, res);
  }

  if (err.isOperational) {
    return res.status(err.code).json({
      status: "fail",
      message: err.message,
    });
  }

  console.log(err.name, "daskjdhadghadsga");
  // res.json(err);
};

export default globalError;
