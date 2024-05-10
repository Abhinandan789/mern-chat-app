import {BiLogOut} from 'react-icons/bi'
import useLogout from '../hooks/useLogout.js';

const LogoutBtn = () => {
  const {loading, logout} = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut className="w-6 h-6 mt-5 text-white cursor-pointer"
          onClick={logout}
        />
      ): (
        <span className='loading loading-spinner'></span>
      )}
    </div>
  )
}

export default LogoutBtn;

//when we gonna press this logout btn then we go into the uselogout.js (read at end to continue this part)