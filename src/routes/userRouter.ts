import express from "express";
const router = express.Router();

import * as userController from "../controller/userController";

router.route("/signup").post(userController.signUp);
router.route("/login").post(userController.login);
router.route("/:username").get(userController.getUser);

export default router;
