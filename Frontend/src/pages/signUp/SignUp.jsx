/* eslint-disable no-unused-vars */
import {Link} from "react-router-dom";
import GenderCheck from "./GenderCheck";
import { useState } from "react";
import useSignup from "../../components/hooks/useSignup";


const SignUp = () =>{
    const [inputs,setInputs] = useState({
        fullName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });


    const {loading,signUp} = useSignup();
    //console.log(loading);

    const handleSubmit=async (e) =>{
        e.preventDefault();
        await signUp(inputs);
    };

    const handleCheckBox = (gender) =>{
        setInputs({...inputs,gender});
    }


    return(
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                
                <h1 className="text-3x1 font-semibold text-center text-gray-300">SignUp <span className="text-red-500">ChatApp</span></h1>


                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Full Name</span>
                        </label>

                        <input type="text" placeholder="John Doe" className="input input-bordered input-accent w-full  h-10" 
                        value={inputs.fullName}
                        onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Username</span>
                        </label>

                        <input type="text" placeholder="johndoe" className="input input-bordered input-accent w-full  h-10" 
                        value={inputs.userName}
                        onChange={(e) => setInputs({...inputs, userName: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>

                        <input type="password" placeholder="Enter Password" className="input input-bordered input-accent w-full  h-10" 
                        value={inputs.password}
                        onChange={(e) => setInputs({...inputs, password: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>

                        <input type="password" placeholder="Confirm Password" className="input input-bordered input-accent w-full  h-10"
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    {/* GENDER CHECKBOXES HERE */}
                    <GenderCheck onCheckboxChange={handleCheckBox} selectedGender={inputs.gender}/>

                    <Link to="/login" className="text-sm hover:underline hover:text-red-600 mt-2 inline-block">Already have an account?</Link>

                    <div>
                        <button className="btn btn-block btn-sm mt-2 border border-slate-700" disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : "Signup"}
                        </button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default SignUp;
