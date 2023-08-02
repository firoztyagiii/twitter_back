import jwt from "jsonwebtoken";

const EXPIRES_IN = 60 * 1000 * 60;

const signToken = (payload: {
  _id: string;
  user: { [key: string]: string };
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: EXPIRES_IN,
      },
      (err, token) => {
        if (token) {
          resolve(token);
        }
        if (err) {
          reject(err);
        }
      }
    );
  });
};

export default signToken;
