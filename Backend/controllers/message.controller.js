import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js';


export const sendMessage = async (req,res) =>{
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;


        let conversation = await Conversation.findOne(
            {
                participants : { $all : [senderId,receiverId] },
            }
        );

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId,receiverId],
            })
        };

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });


        if(newMessage){
            conversation.messages.push(newMessage._id);    
        };

        //SOCKET IO FUNCTION WILL GO HERE


         //await conversation.save(); // these will run one by one firsr conversation save then newMesaage save so
         //await newMessage.save(); //OR we can write something like this below
        Promise.all([conversation.save(),newMessage.save()]); // this will run both at same time 

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage Controller ", error.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export const getMessage = async (req,res) =>{
    try {
        const { id:userToChat }= req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChat]},
        }).populate("messages"); //populate  will give us actual messages not references

        if(!conversation){
            return res.status(200).json([]);
        };

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessage Controller ", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}