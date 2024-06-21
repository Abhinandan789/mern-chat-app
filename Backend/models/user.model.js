import mongoose from 'mongoose';


const FriendRequestSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    senderName: { type: String, required: false },
    profilePic : {type:String , required: false},
    message: { type: String, required: false },
    status: { type: String, required: false }
});

const FriendsSchema = new mongoose.Schema({
    friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: {type: String , required : true},
    fullName: {type: String, required: true},
    profilePic: {type: String , required : true}
})

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: true,
    },
    userName:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
        minlength: 6,
    },
    gender:{
        type:String,
        required: true,
        enum:["male","female"],
    },
    profilePic:{
        type:String,
        default:"",
    },

    friends: [FriendsSchema],

    friendRequests: [FriendRequestSchema]

}, {timestamps: true}); //timestamps : will show createdAt nd UpdatedAt

const User = mongoose.model("User",userSchema);

export default User;