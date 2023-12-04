import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost",
    credentials: true,
  })
);

import userRoutes from "./routes/userRouter";
import tweetRoutes from "./routes/tweetRouter";
import followRoutes from "./routes/followRouter";
import likeRoutes from "./routes/likeRouter";
import replyRoutes from "./routes/replyRouter";
import globalError from "./controller/globalErrorController";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweet", tweetRoutes);
app.use("/api/v1/like", likeRoutes);
app.use("/api/v1/reply", replyRoutes);
app.use("/api/v1/follow", followRoutes);

app.use(globalError);

export default app;
