const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const authController = require("../controller/authController");

const {
  validateLogin,
  validateSignup,
  validateChangePassword,
} = require("../utils/validate");

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

module.exports = router;
