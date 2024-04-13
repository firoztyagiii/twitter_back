class AppError extends Error {
  message;
  code;
  status;
  isOperational;
  constructor(message, code) {
    super(message);
    this.message = message;
    this.code = code;
    this.status = "fail";
    this.isOperational = true;
  }
}

module.exports = AppError;
