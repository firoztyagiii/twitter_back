const express = require("express");
const { protect } = require("../controller/authController");

const router = express.Router({ mergeParams: true });

const replyController = require("../controller/replyController");
const { validateReply } = require("../utils/validate");

router.use(protect);

router.route("/:tweetId").get(replyController.getReplies);
router.route("/").post(validateReply, replyController.postReply);

module.exports = router;
