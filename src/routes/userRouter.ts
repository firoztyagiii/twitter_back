import express from "express";
const router = express.Router();

import * as userController from "../controller/userController";
import * as authController from "../controller/authController";

router.route("/signup").post(userController.signUp);
router.route("/login").post(userController.login);

router.route("/aboutme").get(authController.protect, userController.aboutMe);
router.route("/:username").get(userController.getUser);

export default router;
