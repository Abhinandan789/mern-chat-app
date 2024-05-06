import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import { getUsersForSidebar } from '../controllers/user.controller.js';

const router = new express.Router();

router.get("/",protectRoute, getUsersForSidebar);

export default router;