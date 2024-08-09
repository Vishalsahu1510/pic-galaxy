import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../../store/slices/authSlice"
import { useEffect } from "react";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const role = useSelector((state) => state.auth.role)
  const avatar = useSelector((state) => state.auth.avatar);

  const refreshToken = async () => {
    
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/users/refresh-token", {
        refreshToken : localStorage.getItem("refreshToken")
      }
      )
      const data = await res.data;
      // console.log("data:" ,data)
      dispatch(login(data.data))
    } catch (error) {
      console.error("Error refreshing token:", error.message);
      if (error.response && error.response.status === 404) {
        console.error("API endpoint not found. Check the API URL and endpoint implementation.");
      }
      dispatch(logout())
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken()
    }, 1000 * 60 * 15) // 50 minutes

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center px-5 py-3 ${pathname === "/seller/profile" || pathname === "/buyer/profile"
        ? "hidden"
        : "fixed"
        }  top-0 left-0 right-0 bg-white shadow-md gap-1 sm:gap-0 z-30`}
    >
      <div className="flex justify-between items-center">
        <img src="/picprismlogo.png" alt="" className="w-[50px] " />
        <Link to={"/"} className="font-bold text-3xl">
          Pic-Galaxy
        </Link>
      </div>
      <ul className="flex items-center gap-5 text-lg font-semibold text-gray-400 ml-5 sm:ml-0">
        <Link to={"/"} className="hover:text-black cursor-pointer sm:p-2">
          About
        </Link>
        <Link to={"/"} className="hover:text-black cursor-pointer sm:p-2">
          Contact
        </Link>
        {
          !isAuthenticated ? <>
            <Link to={"/login"} className="hover:text-black cursor-pointer sm:p-2">
              Log In
            </Link>
            <Link to={"/signup"} className="hover:text-black cursor-pointer sm:p-2">
              Sign Up
            </Link></> : <Link to={`/${role}/profile`} className="hover:text-black cursor-pointer sm:p-2">
            {/* Profile */}
            {avatar == null ? (<span title="Profile">{author.charAt(0).toUpperCase()}</span>)
             : (
            <img
              title="Profile"
              className="w-10 h-10 rounded-full object-cover"
              src={avatar}
              alt="Avatar"
            />
          )}
          </Link>
        }
      </ul>
    </div>
  );
}

export default Navbar