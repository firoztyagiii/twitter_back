import express from "express";

const router = express.Router();

import * as followingController from "../controller/followController";
import * as authController from "../controller/authController";

router.use(authController.protect);

router.route("/:userTo/add").post(followingController.follow);
router.route("/:userTo/remove").post(followingController.unfollow);
router.route("/followers").get(followingController.getFollowers);
router.route("/followings").get(followingController.getFollowings);

export default router;
