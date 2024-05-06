import User from "../models/user.model.js";

export const getUsersForSidebar = async (req,res) =>{
    try {
        const loggedInUserId = req.user._id;
        
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password"); //this will basically show us users except us

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in  getUsersFromSidebars: ",error.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// so basically we created this function to fetch the users in our database and we gonna show it in the sidebar frontend part where we can see these users