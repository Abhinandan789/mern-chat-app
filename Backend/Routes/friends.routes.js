import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import {sendFriendRequest, acceptFriendRequest, declineFriendRequest, getFriendRequests, getUserFriends} from '../controllers/friend.contoller.js'


const router = express.Router();

router.post('/sendReq/:id', protectRoute, sendFriendRequest);
router.post('/acceptReq', protectRoute, acceptFriendRequest);
router.post('/declineReq', protectRoute, declineFriendRequest);
router.get('/friendRequests', protectRoute, getFriendRequests);
router.get('/userFriends', protectRoute, getUserFriends);


export default router;