import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

import userRoutes from "./routes/userRouter";
import tweetRoutes from "./routes/tweetRouter";
import followRoutes from "./routes/followRouter";
import globalError from "./controller/globalErrorController";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweet", tweetRoutes);
app.use("/api/v1/follow", followRoutes);

app.use(globalError);

export default app;
