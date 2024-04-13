const path = require("path");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const init = async () => {
  try {
    await mongoose.connect(`${process.env.URI}`);
    console.log("Connected to Database");
    app.listen(process.env.PORT, () => {
      console.log(`Listening to PORT ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("ERROR --->", err);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.log(err, "UNHANDLED REJECTION");
});

init();
