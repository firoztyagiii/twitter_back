class AppError extends Error {
  message: string;
  code: number;
  status: "fail";
  isOperational: boolean;
  constructor(message: string, code: number) {
    super(message);
    this.message = message;
    this.code = code;
    this.status = "fail";
    this.isOperational = true;
  }
}

export default AppError;
