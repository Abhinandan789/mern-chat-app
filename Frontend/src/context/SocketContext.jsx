/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client';

export const SocketContext = createContext();


export const useSocketContext = () =>{
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            //use http://localhost:8000 sometimes idk 
            const newSocket = io("https://chat-app-a7.onrender.com", {
                query: {
                    userId: authUser._id
                }
            }); //port on which ur backend running 


            setSocket(newSocket);
            
            //socket.on() is used to listen to the events, can be used both on client and server side 
            newSocket.on("getOnlineUsers", (users) =>{
                setOnlineUsers(users);
            });

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
