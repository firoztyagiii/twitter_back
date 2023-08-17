import express from "express";

const router = express.Router();

import * as likeController from "../controller/likeController";

router.route("/").post(likeController.postAddLike);

export default router;
