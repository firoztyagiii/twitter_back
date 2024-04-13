const express = require("express");

const router = express.Router();

const followingController = require("../controller/followController");
const authController = require("../controller/authController");

router.use(authController.protect);

router.route("/:userTo/add").post(followingController.follow);
router.route("/:userTo/remove").post(followingController.unfollow);

router.route("/followers").get(followingController.getFollowers);
router.route("/followings").get(followingController.getFollowings);

router.route("/:username/status").get(followingController.getFollowedStatus);

module.exports = router;
