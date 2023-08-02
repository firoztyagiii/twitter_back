import express from "express";

const app = express();

app.use(express.json());

import userRoutes from "./routes/userRouter";
import globalError from "./controller/globalErrorController";

app.use("/api/v1/user", userRoutes);

app.use(globalError);

export default app;
