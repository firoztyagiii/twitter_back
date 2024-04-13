import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import AppError from "./AppError";
import path from "path";
import fs from "fs";

const validateImageAndSave = (image: any) => {
  const allowedExtensions = ["jpeg", "png"];
  const extension =
    image.originalname.split(".")[image.originalname.split(".").length - 1];
  const isAllowed = allowedExtensions.includes(extension);

  if (!isAllowed) throw new AppError(`${extension} is not allowed`, 401);

  let randomString = (Math.random() + 1).toString(36).substring(7);

  const fileName = `${Date.now()}-${randomString}.${extension}`;

  const filePath = path.resolve(`${__dirname}/../../public/img/${fileName}`);

  fs.writeFile(filePath, image.buffer, () => {});

  return `img/${fileName}`;
};

const validateSignup = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object()
    .keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
      username: Joi.string().required(),
    })
    .unknown(true);
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return next(error);
  }
  next();
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    })
    .unknown(true);

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return next(error);
  }
  next();
};

const validateTweet = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object()
    .keys({
      content: Joi.string().required().min(1),
    })
    .unknown(true);

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return next(error);
  }

  if (req.file) {
    const filename = validateImageAndSave(req.file);
    res.locals.imageFileName = filename;
  }

  next();
};

const validateChangePassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object()
    .keys({
      currentPassword: Joi.string().min(8).required(),
      newPassword: Joi.string().required().min(8),
      confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
    })
    .unknown(true);

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return next(error);
  }
  next();
};

const validateReply = (req: Request, res: Response, next: NextFunction) => {
  return validateTweet(req, res, next);
};

export {
  validateSignup,
  validateLogin,
  validateTweet,
  validateReply,
  validateChangePassword,
};
