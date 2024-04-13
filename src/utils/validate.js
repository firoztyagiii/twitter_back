const Joi = require("joi");
const AppError = require("./AppError");
const path = require("path");
const fs = require("fs");

exports.validateImageAndSave = (image) => {
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

exports.validateSignup = (req, res, next) => {
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

exports.validateLogin = (req, res, next) => {
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

exports.validateTweet = (req, res, next) => {
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

exports.validateChangePassword = (req, res, next) => {
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

exports.validateReply = (req, res, next) => {
  return validateTweet(req, res, next);
};
