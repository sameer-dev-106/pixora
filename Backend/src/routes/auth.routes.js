const express = require("express");
const authController = require("../controllers/auth.controller")

const authRouter = express.Router();

/**
 * @route /api/auth/register
 */
authRouter.post("/register", authController.registerController);

/**
 * @route /api/auth/login
 */
authRouter.post("/login", authController.loginController);

module.exports = authRouter