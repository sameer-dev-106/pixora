const userModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});


async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isUserAlreadyExist) {
        let message = "User already exists";

        const emailMatch = isUserAlreadyExist.email === email;
        const usernameMatch = isUserAlreadyExist.username === username;

        if (emailMatch && usernameMatch) {
            message += " with this email and username";
        } else if (emailMatch) {
            message += " with this email address";
        } else if (usernameMatch) {
            message += " with this username";
        }

        res.status(409).json({ message });

    }

    const hash = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    });

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        },
    });
}

async function updateProfileController(req, res) {
    const userId = req.user.id;

    const { username, email, bio } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;

    if (req.file) {
        const file = await imageKit.files.upload({
            file: await toFile(Buffer.from(req.file.buffer), "file"),
            fileName: "profile",
            folder: "Pixora/User-profile"
        });

        user.profileImage = file.url;
    }

    await user.save();

    res.status(200).json({
        message: "Profile updated successfully",
        user
    });
}

async function loginController(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (!user) {
        return res.status(404).json({
            message: "User note found"
        });
    }

    const isPasswordMatched = await bcryptjs.hash(password, user.password)

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid password"
        });
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" });

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        },
        token
    });
}

async function logoutController(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}

async function getMeController(req, res) {
    const userId = req.user.id

    const user = await userModel.findById(userId);

    res.status(200).json({
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    });
}

module.exports = {
    registerController,
    updateProfileController,
    loginController,
    logoutController,
    getMeController
}