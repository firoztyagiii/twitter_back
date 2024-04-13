const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, `${process.env.JWT_SECRET}`, (err, decoded) => {
      if (decoded) {
        return resolve(decoded);
      }
      if (err) {
        reject(err);
      }
    });
  });
};

module.exports = verifyToken;
