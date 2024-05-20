import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import UserInfo from "./UserInfo";
const Home = () =>{
    return(
        <div>
            <div>
                <UserInfo />
            </div>
            
            <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">


                <Sidebar />
                <MessageContainer />
            </div>

            
        </div>
    )
}

export default Home;