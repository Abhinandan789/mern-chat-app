import express from 'express';
import { sendMessage, getMessage } from '../controllers/message.controller.js';
import protectRoute from '../middlewares/protectRoute.js';
const router = express.Router();

router.get("/:id", protectRoute, getMessage);
router.post("/send/:id",protectRoute, sendMessage);

//protectRoute middleware ---> its info is in its own file
//if we do this  router.post("/send/:userId", sendMessage); -->  then in messagecontroller if we want pramas id we have to write  like this console.log("message sent successfull !✔️ to id: ",req.params.userId);
export default router;