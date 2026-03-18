const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
    const followerUserid = req.user.id;
    const followeeUserid = req.params.userId;

    // user cannot follo himself
    if (followerUserid === followeeUserid) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        });
    }

    // check user exists
    const isFolloweeExists = await userModel.findOne({
        _id: followeeUserid
    });

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exists."
        });
    }

    // check existing follow record
    const existingFollow = await followModel.findOne({
        follower: followerUserid,
        followee: followeeUserid
    });

    if (existingFollow) {

        // already accepted
        if (existingFollow.status === "accepted") {
            return res.status(200).json({
                message: `You are already following ${followeeUserid}`
            });
        }

        // already pending
        if (existingFollow.status === "pending") {
            return res.status(200).json({
                message: `Follow request already sent to ${followeeUserid}`
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
        follower: followerUserid,
        followee: followeeUserid,
        status: "pending"
    });

    res.status(201).json({
        message: `Follow request sent to ${followeeUserid}`,
        followRecord
    });
}

async function getFollowRequestsController(req, res) {

    const userid = req.user.id;

    const requests = await followModel.find({
        followee: userid,
        status: "pending"
    });

    res.status(200).json({
        totalRequests: requests.length,
        requests
    });

}

async function acceptFollowRequestController(req, res) {

    const followee = req.user.id;
    const follower = req.params.userId;

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

    const followee = req.user.id;
    const follower = req.params.userId;

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
    const followerUserid = req.user.id;
    const followeeUserid = req.params.userId;

    const isUserFollowing = await followModel.findOne({
        follower: followerUserid,
        followee: followeeUserid
    });

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followeeUserid}`
        });
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message: `You have unfollowed ${followeeUserid}`
    });
}

async function getFollowersController(req, res) {

    const userid = req.user.id;

    const follower = await followModel.find({
        followee: userid,
        status:"accepted"
    });

    res.status(200).json({
        follower
    })
}

async function getFollowingController(req, res) {

    const userid = req.user.id;

    const follower = await followModel.find({
        follower: userid,
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
