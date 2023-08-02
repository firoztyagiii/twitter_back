import express from "express";

const app = express();

app.use(express.json());

import userRoutes from "./routes/userRouter";

app.use("/api/v1/user", userRoutes);

export default app;
