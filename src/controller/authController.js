const verifyToken = require("../utils/verifyToken");

const AppError = require("../utils/AppError");
const userEntity = require("../entity/userEntity");
const comparePassword = require("../utils/comparePassword");

exports.protect = async (req, res, next) => {
  try {
    let token = "";
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

exports.authorizeTo = (...roles) => {
  return async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  };
};

exports.getUserByPassword = async (req, res, next) => {
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
