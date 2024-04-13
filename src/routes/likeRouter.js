const express = require("express");

const router = express.Router({ mergeParams: true });

const likeController = require("../controller/likeController");
const { protect } = require("../controller/authController");

router.use(protect);

router.route("/").post(likeController.postAddLike);
router.route("/").delete(likeController.postRemoveLike);

router.route("/:tweetId/add").post(likeController.postAddLike);
router.route("/:tweetId/remove").post(likeController.postRemoveLike);

module.exports = router;
