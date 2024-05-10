import toast from "react-hot-toast";
import { useState } from "react";
import {useAuthContext} from '../../context/AuthContext';



const useSignup = () =>{
    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const {setAuthUser} = useAuthContext();

    const signUp = async ({fullName, userName, password, confirmPassword, gender}) =>{
        const success = handleInpuError({fullName, userName, password, confirmPassword, gender});
        if(!success) return;

        setLoading(true);
        
        try {
            const res= await fetch('/api/auth/signup', {

                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({fullName, userName, password, confirmPassword, gender})
            });

            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            

            //localstorage - to get if the user is alrdy logged in before so he doesnt have to log in again n again
            localStorage.setItem("chat-user",JSON.stringify(data));
            // context- when done signing up then we have to take user to the homepage from this sign up page as he is done signing up  
            setAuthUser(data);


        } catch (error) {
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    };
          
    return {loading, signUp};
}
export default useSignup;



function handleInpuError({fullName, userName, password, confirmPassword, gender}){
    if(!fullName || !userName || !password || !confirmPassword || !gender){
        toast.error("Please fill in all fields");
        return false;
    }

    if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return false;
    }

    if(password.length <= 6){
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}


