import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";



const useLogout =() =>{
    
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const logout = async () =>{
        setLoading(true);

        try {
            const res = await fetch("/api/auth/logout", {
                method : "POST",
                headers : {"ContentType": "application/json"}
            });

            const data = await res.json();
            if(data.error){
                throw new Error(data.error);    
            }

            localStorage.removeItem("chat-user");
            setAuthUser(null);
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    };

    return {loading, logout};
}

export default useLogout;

//then what happens here as we metioned we go to url ('/auth/api/logout') which is in backend functionality it will send the req to server now nd then here localstorage will remove the chat-user which was logged in before and authUser will become false

//so because the "authUser" is now false now in App.jsx this line <Route path="/" element={authUser ? <Home />: <Navigate to="/login" />} /> this will take us to the login page as we logged out 