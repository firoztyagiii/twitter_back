import bcryptjs from "bcryptjs";

const comparePassword = async (userPass: string, dbPass: string) => {
  const isCorrect = await bcryptjs.compare(dbPass, userPass);
  return isCorrect;
};

export default comparePassword;
