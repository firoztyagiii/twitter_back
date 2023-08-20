import express from "express";

const router = express.Router({ mergeParams: true });

import * as likeController from "../controller/likeController";
import { protect } from "../controller/authController";

router.use(protect);

router.route("/").post(likeController.postAddLike);
router.route("/").delete(likeController.postRemoveLike);

router.route("/:tweetId/add").post(likeController.postAddLike);
router.route("/:tweetId/remove").post(likeController.postRemoveLike);

export default router;
