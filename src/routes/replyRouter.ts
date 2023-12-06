import express from "express";
import { protect } from "../controller/authController";

const router = express.Router({ mergeParams: true });

import * as replyController from "../controller/replyController";
import { validateReply } from "../utils/validate";

router.use(protect);

router.route("/:tweetId").get(replyController.getReplies);
router.route("/").post(validateReply, replyController.postReply);

export default router;
