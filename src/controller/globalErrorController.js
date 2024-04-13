const Joi = require("joi");

const handleValidationError = (err, res) => {
  let message = [];
  for (const error in err.errors) {
    message.push(err.errors[error].message);
  }
  res.status(400).json({
    status: "fail",
    message: message.join(", "),
  });
};

const handleJoiValidationError = (err, res) => {
  let message = [];
  for (const key of err.details) {
    message.push(key.message);
  }
  res.status(400).json({
    status: "fail",
    message: message.join(", ").toString(),
  });
};

const globalError = (err, req, res, next) => {
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

  console.log(err, "<<< GLOBAL ERROR");
  // res.json(err);
};

module.exports = globalError;
