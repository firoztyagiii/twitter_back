import express from "express";
const router = express.Router();

import * as userController from "../controller/userController";
import * as authController from "../controller/authController";
import {
  validateLogin,
  validateSignup,
  validateChangePassword,
} from "../utils/validate";

router.route("/signup").post(validateSignup, userController.signUp);
router.route("/login").post(validateLogin, userController.login);
router.route("/logout").post(userController.logout);

router
  .route("/change-password")
  .post(
    authController.protect,
    validateChangePassword,
    userController.changePassword
  );

router.route("/aboutme").get(authController.protect, userController.aboutMe);
router.route("/timeline").get(authController.protect, userController.timeline);
router.route("/:username/info").post(authController.getUserByPassword);
router.route("/:username").get(userController.getUser);

router.route("update").patch(authController.protect, userController.patchUser);

export default router;
