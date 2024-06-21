import mongoose from 'mongoose';
import User from '../models/user.model.js';

// Send Friend Request
export const sendFriendRequest = async (req, res) => {
    const fromUserId = req.user._id;
    const toUserId = req.params.id;
    const {message} = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(toUserId)) {
            return res.status(400).send('Invalid user ID');
        }
        
        const fromUser = await User.findById(fromUserId);
        const toUser = await User.findById(toUserId);

        if (!toUser) {
            return res.status(404).send('User not found');
        }

        // to avoid the fact u try to send the request multiple times
        if (toUser.friends.includes(fromUserId)) {
            return res.status(400).send('You are already friends with this user');
        }

        // Check if a friend request is already sent
        // const existingRequest = toUser.friendRequests.find(request => request.from.toString() === fromUserId);
        // console.log('Existing Request:', existingRequest);

        // if (existingRequest) {
        //     return res.status(400).send('Friend request already sent');
        // }

        const friendRequest = {
            from : fromUserId,
            senderName : fromUser.fullName,
            profilePic : fromUser.profilePic,
            message : message,
            status : 'pending'
        }

        toUser.friendRequests.push(friendRequest);
        await toUser.save();

        res.status(200).send('Friend Request sent!');
    } catch (error) {
        console.log('Error in send friend request controller:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Accept Friend Request
export const acceptFriendRequest = async (req, res) => {
    const userId = req.user._id;
    const { fromUserId } = req.body;
    

    try {
        if (!mongoose.Types.ObjectId.isValid(fromUserId)) {
            return res.status(400).send('Invalid user ID');
        }

        const user = await User.findById(userId);
        const fromUser = await User.findById(fromUserId);

        if (!user || !fromUser) {
            return res.status(404).send('User not found');
        }
        console.log("fromUser : ",fromUser);

        const userFriend = {
            friendId: fromUserId,
            userName : fromUser.userName,
            fullName: fromUser.fullName,
            profilePic : fromUser.profilePic
        };

        
        user.friends.push(userFriend);
        fromUser.friends.push({
            friendId: userId,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        });

        user.friendRequests = user.friendRequests.filter(req => req.from.toString() !== fromUserId);

        await user.save();
        await fromUser.save();

        res.status(200).send('Friend request accepted');
    } catch (error) {
        console.log('Error in accept friend request controller:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Decline Friend Request
export const declineFriendRequest = async (req, res) => {
    const userId = req.user._id;
    const { fromUserId } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(fromUserId)) {
            return res.status(400).send('Invalid user ID');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.friendRequests = user.friendRequests.filter(req => req.from.toString() !== fromUserId);

        await user.save();

        res.status(200).send('Friend request declined');
    } catch (error) {
        console.log('Error in decline friend request controller:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Get Friend Requests
export const getFriendRequests = async (req, res) => {
    const userId = req.user._id;    

    try {
        const user = await User.findById(userId).select('friendRequests');

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user.friendRequests);
    } catch (error) {
        console.log('Error in get friend requests controller:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Get the User Friends

export const getUserFriends = async (req,res) =>{
    const userId = req.user._id;

    try {
        const user = await User.findOne(userId).select('friends');

        if(!user){
            res.status(404).send("User not found");
        }

        res.status(200).send(user.friends);

    } catch (error) {
        cosnole.log('Error in get user friends: ', error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
}