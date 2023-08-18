import express from "express";

const router = express.Router({ mergeParams: true });

import * as likeController from "../controller/likeController";
import { protect } from "../controller/authController";

router.use(protect);

router.route("/add").post(likeController.postAddLike);
router.route("/remove").post(likeController.postRemoveLike);

export default router;
