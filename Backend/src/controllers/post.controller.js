const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");
const followModel = require("../models/follow.model");

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
    if (!req.file) {
        return res.status(400).json({
            message: "Image file is required"
        });
    }

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test",
        folder: "Pixora/posts"
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    });

    res.status(201).json({
        message: "Post created successfully.",
        post
    });
}

async function getPostController(req, res) {
    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    });

    res.status(200).json({
        message: "Posts fetched successfully.",
        posts
    })
}

async function getPostDetailsController(req, res) {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        });
    }

    res.status(200).json({
        message: "Post Fetched successfully.",
        post
    });
}

async function deletePostController(req, res) {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        });
    }

    await postModel.findByIdAndDelete(postId);

    res.status(200).json({
        message: "Post deleted successfully."
    });
}

async function likePostController(req, res) {
    const userid = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return req.status(404).json({
            message: "Post not found."
        });
    }

    const isPostAlreadyLiked = await likeModel.findOne({
        post: postId,
        user: userid
    });

    if (isPostAlreadyLiked) {
        return res.status(200).json({
            message: `You are already Like this post ${postId}`,
            liked: isPostAlreadyLiked
        });
    }

    const like = await likeModel.create({
        post: postId,
        user: userid
    });

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })
}

async function getFeedController(req, res) {
    try {
        const userId = req.user.id;

        const following = await followModel.find({
            follower: userId,
            status: "accepted"
        }).select("followee");

        const followingIds = following.map(follow => follow.followee);
        followingIds.push(userId);

        const posts = await postModel.find({
            user: { $in: followingIds }
        }).populate("user", "username profileImage").sort({ createdAt: -1 });

        res.status(200).json({
            message: "Feed fetched successfully.",
            posts
        });

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the feed.",
            error: error.message
        });
    }
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    deletePostController,
    likePostController,
    getFeedController
}
