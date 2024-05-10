import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateWebTokenAndSetCookie from "../utils/genrateToken.js";

export const testing = async(req,res) =>{
    res.send("Testing done ig its working");
}

export const signup = async (req, res) => {
    try {
        const {fullName, userName, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords doesn't match "})
        }

        const user =  await User.findOne({userName});

        if(user){
            return res.status(400).json({error: "Username already existed"})
        }

        //HASH PASSWORD HERE 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // random profile pic for the boy and girl users
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        console.log("Username : "+userName);
        const newUser  = new User({
            fullName,
            userName,
            password : hashedPassword,
            gender,
            profilePic: gender === "male"? boyProfilePic : girlProfilePic,
        });
        
        if(newUser){
            //Generate JWT tokens 
            generateWebTokenAndSetCookie(newUser._id,res);
            
            await newUser.save(); //here we saved the new user data in the database

            //and this shows the data has been stored 
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic,
            });
        }else{
            res.status(400).json({error: "Invalid User Data"});
        }
        
    } catch (error) {
        console.log("Error in signUp controller",error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};


export const login = async (req,res)=>{
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName});;
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); //We're using an empty string in process.env.JWT_SECRET || '' to handle errors from bcrypt differently. This way, if bcrypt throws an error, it won't overshadow our specific error messages like "Invalid username or password." It's like making sure we get the right feedback for the right mistakes.
        
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"});
        };

        generateWebTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in the Login controller",error.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{ maxAge: 0 });
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in the Logout controller", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    };
};


