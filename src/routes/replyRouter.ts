import express from "express";
import { protect } from "../controller/authController";

const router = express.Router({ mergeParams: true });

import * as replyController from "../controller/replyController";

router.use(protect);

router.route("/:tweetId").get(replyController.getReplies);
router.route("/").post(replyController.postReply);

export default router;
