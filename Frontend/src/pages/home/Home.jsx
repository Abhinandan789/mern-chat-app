import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";


import UserInfo from "./UserInfo";
import Clock from './Clock';

const Home = () =>{
    return(
        <div>
            <div className="flex justify-between items-center bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 shadow-md bg-gray-400 border-1 rounded-bl-sm rounded-br-sm">
                <UserInfo />
                <Clock />  
            </div>
            
            <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">


                <Sidebar />
                <MessageContainer />
            </div>

            
        </div>
    )
}

export default Home;