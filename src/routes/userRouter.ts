import express from "express";
const router = express.Router();

import * as userController from "../controller/userController";

router.route("/signup").post(userController.signUp);

export default router;
