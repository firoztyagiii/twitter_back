import express from "express";

const router = express.Router();

import * as followingController from "../controller/followController";
import * as authController from "../controller/authController";

router.use(authController.protect);
router.route("/:id").post(followingController.follow);

export default router;
