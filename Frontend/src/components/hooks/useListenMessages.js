import { useEffect } from "react";

import { useSocketContext } from "../../context/SocketContext"
import useConversation from "../../zustand/useConversation";
import toast from 'react-hot-toast';
import notificationSound from '../../assets/sounds/notification.mp3';

const useListenMessages = () => {
  const {socket}=useSocketContext();
  const {messages, setMessages, selectedConversation} = useConversation();

  useEffect(() =>{
    socket?.on("newMessage", (newMessage) =>{
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play(); 
        if(selectedConversation._id === newMessage.senderId){
          setMessages([...messages, newMessage]);
        }else{
          toast.success(`New Message from : ${newMessage.senderName.fullName}`);
        }
        
        // console.log("newMssg",newMessage.senderName.fullName);
        // console.log("newMssg", newMessage);

        
    })

    return () => {
        socket?.off("newMessage")
    }
  },[socket,setMessages, messages, selectedConversation])
}

export default useListenMessages
