import express from 'express';
import { login, logout,signup, testing } from '../controllers/auth.controller.js';

const router = express.Router();

// so its bascially like this when routes called frommthe server js the line which ssy
//app.use("api/auth,authRoutes") so here in this file authRoutes
//router.get("signup",signup); this will be seen by browser as "/api/auth/signup" ok so this signup will call the signup thing in the controllers 

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/testing",testing);


export default router;