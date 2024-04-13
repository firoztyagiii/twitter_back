const bcryptjs = require("bcryptjs");

const comparePassword = async (userPass, dbPass) => {
  const isCorrect = await bcryptjs.compare(dbPass, userPass);
  return isCorrect;
};

module.exports = comparePassword;
