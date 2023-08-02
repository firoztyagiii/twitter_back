import jwt, { JwtPayload } from "jsonwebtoken";

const verifyToken = (token: string): JwtPayload => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, `${process.env.JWT_SECRET}`, (err, decoded) => {
      if (decoded) {
        resolve(decoded);
      }
      if (err) {
        reject(err);
      }
    });
  });
};

export default verifyToken;
