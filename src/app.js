const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const userRoutes = require("./routes/userRouter");
const tweetRoutes = require("./routes/tweetRouter");
// const followRoutes = require("./routes/followRouter");
// const likeRoutes = require("./routes/likeRouter");
// const replyRoutes = require("./routes/replyRouter");
const globalError = require("./controller/globalErrorController");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweet", tweetRoutes);

// app.use("/api/v1/like", likeRoutes);
// app.use("/api/v1/reply", replyRoutes);
// app.use("/api/v1/follow", followRoutes);

app.use(globalError);

module.exports = app;
