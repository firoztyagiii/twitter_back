import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

import userRoutes from "./routes/userRouter";
import tweetRoutes from "./routes/tweetRouter";
import globalError from "./controller/globalErrorController";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweet", tweetRoutes);

app.use(globalError);

export default app;
