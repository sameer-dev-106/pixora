const express = require("express");
const postController = require("../controllers/post.controller")
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");

/**
 * @route POST /api/posts [protected]
 * @description Create a post with the content and image (optional) provided in the request body. The post should be associated with the user that the request come from
 */
postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)

/**
 * @route GET /api/posts/ [protected]
 * @description Get all the posts created by the user that the request come from. also return the total number of posts created by the user
 */
postRouter.get("/", identifyUser, postController.getPostController);

/**
 * @route GET /api/posts/details/:postid
 * @description return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController);

/**
 * @route DELETE /api/posts/:postid
 * @description delete the post with the id provided in the request params. also check whether the post belongs to the user that the request come from
 */
postRouter.delete("/:postId", identifyUser, postController.deletePostController);

/**
 * @route POST /api/posts/feed
 * @description Get the feed of posts for the authenticated user. The feed should include posts from users that the authenticated user is following, sorted by creation date (newest first).
 */
postRouter.get("/feed", identifyUser, postController.getFeedController);


/**
 * @route POST /api/posts/like/:postid
 * @description like a post with the id provided in the request params. 
 */
postRouter.post("/like/:postId", identifyUser, postController.likePostController);

/**
 * @route POST /api/posts/unlike/:postid
 * @description unlike a post with the id provided in the request params. 
 */
postRouter.post("/unlike/:postId", identifyUser, postController.unlikePostController);

/**
 * @route POST /api/posts/comment/:postid
 * @description comment on a post with the id provided in the request params. 
 */
postRouter.post("/comment/:postId", identifyUser, postController.createCommentController);

/**
 * @route GET /api/posts/comments/:postid
 * @description get all comments on a post with the id provided in the request params.
 */
postRouter.get("/comments/:postId", identifyUser, postController.getCommentsController);

module.exports = postRouter;