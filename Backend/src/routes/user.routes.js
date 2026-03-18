const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");

const userRouter = express.Router();


/**
 * @route POST /api/users/follow/:userId
 * @description Send follow request to a user (private account workflow)
 * @access Private
 */
userRouter.post("/follow/:userId", identifyUser, userController.followUserController);

/**
 * @route GET /api/users/follow-requests
 * @description Get all pending follow requests for the authenticated user
 * @access Private
 */
userRouter.get("/follow-requests", identifyUser, userController.getFollowRequestsController);

/**
 * @route POST /api/users/follow/accept/:userId
 * @description Accept a follow request sent by a user
 * @access Private
 */
userRouter.post("/follow/accept/:userId", identifyUser, userController.acceptFollowRequestController);

/**
 * @route POST /api/users/follow/reject/:userId
 * @description Reject a follow request sent by a user
 * @access Private
 */
userRouter.post("/follow/reject/:userId", identifyUser, userController.rejectFollowRequestController);

/**
 * @route POST /api/users/unfollow/:userId
 * @description Unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:userId", identifyUser, userController.unfollowUserController);

/**
 * @route GET /api/users/followers
 * @description Get list of users who follow the authenticated user
 * @access Private
 */
userRouter.get("/followers", identifyUser, userController.getFollowersController);

/**
 * @route GET /api/users/following
 * @description Get list of users that the authenticated user is following
 * @access Private
 */
userRouter.get("/following", identifyUser, userController.getFollowingController);


module.exports = userRouter;
