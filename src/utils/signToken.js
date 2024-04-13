const jwt = require("jsonwebtoken");

const EXPIRES_IN = 60 * 1000 * 60;

const signToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        _id: payload._id,
        user: {
          name: payload.name,
          username: payload.username,
          image: payload.image,
        },
      },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: EXPIRES_IN,
      },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        if (token) {
          resolve(token);
        }
      }
    );
  });
};

module.exports = signToken;
