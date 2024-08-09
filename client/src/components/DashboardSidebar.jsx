import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { setTab } from "../../store/slices/navSlice";
import { logout , login } from "../../store/slices/authSlice";
import axios from "axios";
import toast from "react-hot-toast";

/////  react icons--
import { AiFillHome } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { IoIosHeart, IoMdPhotos } from "react-icons/io";

const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const sidebar = useSelector((state) => state.nav.sidebar);
  const tab = useSelector((state) => state.nav.tab);
  const author = useSelector((state) => state.auth.author);
  const avatar = useSelector((state) => state.auth.avatar);
  // const role = useSelector((state)=>state.auth.role);

  const switchProfile = async () => {
    const res = await axios.get(import.meta.env.VITE_API_URL + "/users/switch-profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const token = await res.data;
    // console.log("token------",token)
    toast.success(token.message);
    // console.log("user------",token.data.user.accountType)
    dispatch(login(token.data));
    navigate(`/${token.data.user.accountType}/profile`);
  };


  return (
    <nav
      className={`fixed z-10 ${
        !sidebar == true
          ? "-translate-x-[500px] sm:translate-x-0"
          : "translate-x-0"
      } ease-in-out duration-300 flex sm:static text-lg font-semibold bg-white shadow-lg flex-col gap-2 w-fit min-h-screen p-3 list-none justify-between items-center`}
    >
      <div>
        {/* Circle with my names first letter Or avatar */}
        <div
          className="bg-black mx-2 my-5 w-12 h-12 flex text-lg justify-center items-center rounded-full text-white"
        >
          {avatar == null ? (
            <span>{author.charAt(0).toUpperCase()}</span>
          ) : (
            <img
              className="w-full h-full rounded-full object-cover"
              src={avatar}
              alt="Avatar"
            />
          )}
        </div>

        {/* list items */}
        <div className="flex flex-col gap-2">
          {pathname === "/seller/profile" ? (
            <li
              className={`w-full rounded-lg px-1 hover:bg-black hover:text-white cursor-pointer transition-all text-nowrap ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
                tab === "photos-management" && "bg-black text-white"
              }`}
              onClick={() => dispatch(setTab("photos-management"))}
            >
              <IoMdPhotos /> Photos Management
            </li>
          ) : (
            <li
              className={`w-full rounded-lg px-1 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
                tab === "photos-purchased" && "bg-black text-white"
              }`}
              onClick={() => dispatch(setTab("photos-purchased"))}
            >
              <IoMdPhotos /> Photos Purchased
            </li>
          )}

          <li
            className={`w-full rounded-lg px-1 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
              tab == "analytics" && "bg-black text-white"
            }`}
            onClick={() => dispatch(setTab("analytics"))}
          >
            <SiGoogleanalytics /> Analytics
          </li>

          <li
            className={`w-full rounded-lg px-1 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
              tab === "orders" && "bg-black text-white"
            }`}
            onClick={() => dispatch(setTab("orders"))}
          >
            <FaList /> Orders
          </li>
          <li
            className={`w-full rounded-lg px-1 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
              tab === "favourites" && "bg-black text-white"
            }`}
            onClick={() => dispatch(setTab("favourites"))}
          >
            <IoIosHeart /> Favourites
          </li>
          <Link
            to="/"
            className="w-full rounded-lg px-1 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center"
          >
            <AiFillHome /> Home
          </Link>
          <button
            className="w-full px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 gap-2 border-b-2 border-black text-center uppercase text-sm py-2"
            onClick={switchProfile}
          >
            Switch to {pathname == "/seller/profile" ? "buyer" : "seller"}
          </button>
        </div>
      </div>

      {/* logout button */}
      <li
        className="w-full rounded-lg px-1 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center"
        onClick={() => dispatch(logout())}
      >
        <IoLogOut /> Logout
      </li>
    </nav>
  );
};

export default DashboardSidebar;