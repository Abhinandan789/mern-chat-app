import jwt from 'jsonwebtoken';

const generateWebTokenAndSetCookie = (userId,res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET_CODE,{
        expiresIn: '15d'
    })

    res.cookie("jwt",token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //this is in mili second format
        httpOnly: true,   // 🔒 Keeping our JWT cookie safe with httpOnly: true!
        // Imagine our cookie is a VIP pass to a concert.
        // Setting httpOnly: true is like saying, "This pass can only be used at the concert entrance; it can't be copied or used for anything else."
        // So, with httpOnly: true, our cookie stays locked away in the HTTP vault, safe from sneaky script kiddies trying to mess with it. #SecurityFirst 💪
        sameSite: "strict",
        secure: process.env.NODE_ENV !== 'development',
    })
};

export default generateWebTokenAndSetCookie;