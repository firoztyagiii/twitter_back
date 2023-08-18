import express from "express";
const router = express.Router();

import * as authController from "../controller/authController";
import * as tweetController from "../controller/tweetController";
import likeRouter from "./likeRouter";
router.use(authController.protect);

router.route("/").get(tweetController.getTweets);
router.route("/").post(tweetController.postTweet);

router.route("/:id").get(tweetController.getTweet);
router.route("/:id/like").post(likeRouter);

// router.route("/:id/reply").post(tweetController.postAddLike);
// router.route("/:id/retweet").post(tweetController.postAddLike);

export default router;
