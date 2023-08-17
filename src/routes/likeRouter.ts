import express from "express";

const router = express.Router();

import * as likeController from "../controller/likeController";
import { protect } from "../controller/authController";

router.use(protect);
router.route("/:tweetId").post(likeController.postAddLike);

export default router;
