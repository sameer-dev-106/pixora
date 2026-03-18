const express = require("express");
const authController = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

const authRouter = express.Router();

/**
 * @route /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerController);

/**
 * @route /api/auth/login
 * @description Log in a user
 * @access Public
 */
authRouter.post("/login", authController.loginController);

/**
 * @route /api/auth/get-me
 * @description Get the currently logged-in user's information
 * @access Private
 */
authRouter.get("/get-me", identifyUser, authController.getMeController);

module.exports = authRouter