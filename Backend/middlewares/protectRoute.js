import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({error: 'Unauthorized - No Token Provided'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);

        if(!decoded){
            return res.status(401).json({error: 'Unauthorized - Invalid Token'});
        }

        const user = await User.findById(decoded.userId).select("-password"); //userId --> we have called it userId when we are trying to sign our jwt token u can check it in utils -> generateToken 

        if(!user){
            return res.status(401).json({error: "User not found"});
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export default protectRoute;

// we  creating this protectRoute middleware because before the sender can send the message we have to make sure that it is the person in our database member