import express from "express";
const router = express.Router();
import multer from "multer";

import * as authController from "../controller/authController";
import * as tweetController from "../controller/tweetController";
import replyRouter from "./replyRouter";
import likeRouter from "./likeRouter";
import { validateTweet } from "../utils/validate";

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(authController.protect);

router.use("/:tweetId/reply", replyRouter);
router.use("/:tweetId/like", likeRouter);
router.use("/:tweetId/unlike", likeRouter);

router.route("/").get(tweetController.getTweets);
router.route("/:userId/latest").get(tweetController.getLatestTweet);
router.route("/:id").get(tweetController.getTweet);

router.route("/:id/repost").post(tweetController.postRepost);

router
  .route("/")
  .post(upload.single("media"), validateTweet, tweetController.postTweet);

export default router;
