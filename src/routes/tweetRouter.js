const express = require("express");
const router = express.Router();
const multer = require("multer");

const authController = require("../controller/authController");
const tweetController = require("../controller/tweetController");
const { validateTweet } = require("../utils/validate");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(authController.protect);

router
  .route("/")
  .post(upload.single("media"), validateTweet, tweetController.postTweet);

router.route("/:id").get(tweetController.getTweet);

router.route("/:id/retweet").post(tweetController.postRetweet);
router.route("/:id/reply").post(tweetController.postReply);
router.route("/:id/like").post(tweetController.postLike);
router.route("/:id/unlike").delete(tweetController.deleteLike);

router.route("/").get(tweetController.getTweets);

router.route("/:userId/latest").get(tweetController.getLatestTweet);

router.route("/:id/reply").get(tweetController.getReplies);

module.exports = router;
