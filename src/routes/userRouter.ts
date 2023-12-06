import express from "express";
const router = express.Router();

import * as userController from "../controller/userController";
import * as authController from "../controller/authController";
import { validateLogin, validateSignup } from "../utils/validate";

router.route("/signup").post(validateSignup, userController.signUp);
router.route("/login").post(validateLogin, userController.login);

router.route("/aboutme").get(authController.protect, userController.aboutMe);
router.route("/timeline").get(authController.protect, userController.timeline);

router.route("/:username").get(userController.getUser);

export default router;
