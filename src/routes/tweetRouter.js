const express = require("express");
const router = express.Router();
const multer = require("multer");

const authController = require("../controller/authController");
const tweetController = require("../controller/tweetController");
const replyRouter = require("./replyRouter");
const likeRouter = require("./likeRouter");
const { validateTweet } = require("../utils/validate");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(authController.protect);

router.route("/:id/repost").post(tweetController.postRepost);

router.use("/:tweetId/reply", replyRouter);
router.use("/:tweetId/like", likeRouter);
router.use("/:tweetId/unlike", likeRouter);

router.route("/").get(tweetController.getTweets); // READ THIS //
router.route("/:userId/latest").get(tweetController.getLatestTweet);
router.route("/:id").get(tweetController.getTweet);

router
  .route("/")
  .post(upload.single("media"), validateTweet, tweetController.postTweet);

module.exports = router;
