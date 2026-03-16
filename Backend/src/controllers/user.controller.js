const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username

    // user cannot follo himself
    if (followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        });
    }

    // check user exists
    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    });

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exists."
        });
    }

    // check existing follow record
    const existingFollow = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    });

    if (existingFollow) {

        // already accepted
        if (existingFollow.status === "accepted") {
            return res.status(200).json({
                message: `You are already following ${followeeUsername}`
            });
        }

        // already pending
        if (existingFollow.status === "pending") {
            return res.status(200).json({
                message: `Follow request already sent to ${followeeUsername}`
            });
        }

        // rejected case
        if (existingFollow.status === "rejected") {
            existingFollow.status = "pending";
            await existingFollow.save();

            return res.status(200).json({
                message: "Follow request sent again"
            });
        }

    }

    // create follow request
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    });

    res.status(201).json({
        message: `Follow request sent to ${followeeUsername}`,
        followRecord
    });
}

async function getFollowRequestsController(req, res) {

    const username = req.user.username;

    const requests = await followModel.find({
        followee: username,
        status: "pending"
    });

    res.status(200).json({
        totalRequests: requests.length,
        requests
    });

}

async function acceptFollowRequestController(req, res) {

    const followee = req.user.username;
    const follower = req.params.username;

    const request = await followModel.findOneAndUpdate(
        {
            follower: follower,
            followee: followee,
            status: "pending"
        },
        {
            status: "accepted"
        },
        { new: true }
    );

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    res.status(200).json({
        message: "Follow request accepted",
        request
    });

}

async function rejectFollowRequestController(req, res) {

    const followee = req.user.username;
    const follower = req.params.username;

    const request = await followModel.findOneAndUpdate(
        {
            follower: follower,
            followee: followee
        },
        {
            status: "rejected"
        }
    );

    res.status(200).json({
        message: "Follow request rejected",
        request
    });
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    });

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        });
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    });
}

async function getFollowersController(req, res) {

    const username = req.user.username;

    const follower = await followModel.find({
        followee: username,
        status:"accepted"
    });

    res.status(200).json({
        follower
    })
}

async function getFollowingController(req, res) {

    const username = req.user.username;

    const follower = await followModel.find({
        follower: username,
        status: "accepted"
    });

    res.status(200).json({
        follower
    })
}

module.exports = {
    followUserController,
    getFollowRequestsController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    unfollowUserController,
    getFollowersController,
    getFollowingController
}
