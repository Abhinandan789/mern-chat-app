import GenderCheck from "./GenderCheck";

const SignUp = () =>{
    return(
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                
                <h1 className="text-3x1 font-semibold text-center text-gray-300">SignUp <span className="text-red-500">ChatApp</span></h1>


                <form>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Full Name</span>
                        </label>

                        <input type="text" placeholder="John Doe" className="input input-bordered input-accent w-full  h-10" />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Username</span>
                        </label>

                        <input type="text" placeholder="johndoe" className="input input-bordered input-accent w-full  h-10" />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>

                        <input type="text" placeholder="Enter Password" className="input input-bordered input-accent w-full  h-10" />
                    </div>

                    {/* GENDER CHECKBOXES HERE */}
                    <GenderCheck />

                    <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Already have an account?</a>

                    <div>
                        <button className="btn btn-block btn-sm mt-2 border border-slate-700">Sign Up</button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default SignUp;