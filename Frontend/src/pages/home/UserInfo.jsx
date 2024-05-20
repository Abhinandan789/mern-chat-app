import { useAuthContext } from '../../context/AuthContext';
const UserInfo = () => {
    

    const { authUser } = useAuthContext();

  return (
      <div className="flex items-center p-2 w-100 h-14 shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <section className="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#F9C97C] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300">
              <img src={authUser.profilePic} alt="user pfp" />

          </section>

          <section className="block border-l border-gray-300 m-3">
              <div className="pl-3">
                  <h3 className="bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] to-[#27272A] text-lg font-bold">{authUser.fullName}</h3>
                  <h3 className="text-gray-600 font-semibold text-sm">{`Username : ${authUser.userName}`}</h3>
              </div>
          </section>
      </div>
  )
}

export default UserInfo