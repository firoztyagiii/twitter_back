import express from "express";
const router = express.Router();

import * as authController from "../controller/authController";
import * as tweetController from "../controller/tweetController";

router.use(authController.protect);
router.route("/").post(tweetController.postTweet);
router.route("/").get(tweetController.getTweets);
router.route("/:id").get(tweetController.getTweet);
router.route("/:id/addlike").post(tweetController.postAddLike);

export default router;
