import mongoose from 'mongoose';

const friendRequestSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    senderName: { type: String, required : true},
    message : {type: String , required: true},
    status: { type: String, required: true}
});

const Friends = mongoose.model("Friends", friendRequestSchema);

export default Friends;