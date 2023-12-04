import AppError from "./AppError";
import path from "path";
import fs from "fs";

const saveImage = (imgData: any) => {
  const allowedExtensions = ["jpeg,png"];
  const extension = imgData.originalname.split(".");
  const isAllowed = allowedExtensions.includes(extension);
  if (!isAllowed) throw new AppError(`${extension} is not allowed`, 401);
  let randomString = (Math.random() + 1).toString(36).substring(7);

  const fileName = `${Date.now()}-${randomString}.${extension}`;
  fs.createWriteStream(path.join(__dirname, `public/img/${fileName}`));
};

export default saveImage;
