import Messages from "./Messages"
import MessageInput from "./MessageInput"
import { TiMessages } from 'react-icons/ti'
import useConversation from "../../zustand/useConversation"
import { useEffect } from "react"

const MessageContainer = () => {

    const {selectedConversation, setSelectedConversation} = useConversation();

    useEffect(() => {


        //cleanUp function basically when we select chat it keep selected even u log out so we have to manually clean this shit up so when we reload means the component is not in view or unmounts the dependency array in last which contains setSelectedCOnversation will change nnd it will be set to null
        return () => setSelectedConversation(null);
    },[setSelectedConversation])
    
  return (
    <div className="md:min-w-[600px] flex flex-col">
        {!selectedConversation ? (
            <NoChatSelected />
        ) : (
                  <>
                      {/* Header */}

                      <div className="bg-slate-700 px-4 py-3 mb-2">
                          <span className="label-text">To:</span> <span className="text-white font-bold">{selectedConversation.fullName}</span>
                      </div>

                      <Messages />
                      <MessageInput />
                  </>
        )}
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () =>{
    return(
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 👋 Asahii</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className="text-3xl md:text-6xl text-center" />
            </div>
        </div>
    )
};