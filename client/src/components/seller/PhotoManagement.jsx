import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import toast from "react-hot-toast";
import axios from "axios"
import ImageCard from "../ImageCard"
import ImageAdd from "./ImageAdd";
import DashboardHeader from "../DashboardHeader";
import { logout } from "../../../store/slices/authSlice";
import { setMyPosts } from "../../../store/slices/postsSlice";


////    ----react-icons-------
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";


const PhotoManagement = () => {

  const posts = useSelector((state) => state.posts.myPosts)
  const dispatch = useDispatch()

  const getMyPosts = async () => {
    try {
      if (posts.length > 0) return
      const res = await axios.get(import.meta.env.VITE_API_URL + "/post/myPosts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
      })
      const { data } = await res.data;
      dispatch(setMyPosts(data))

    } catch (error) {
      toast.error(error.response.data.error)
      dispatch(logout())
    }
  }

  useEffect(() => {
    getMyPosts()
  }, [])


  const deletePost = async (id)=>{
    try {
      const res = await axios.delete(import.meta.env.VITE_API_URL + `/post/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
      })
      const data = await res.data;
      toast.success(data.message)      
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row">
      <div>
        <DashboardHeader />
        <ImageAdd />
      </div>

      {/* SECTION WHERE ALL THE IMAGES ARE DISPLAYED */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5 bg-transparent sm:bg-white  p-5 w-[90vw] sm:w-[55vw] sm:h-[95vh]  sm:overflow-y-scroll rounded-lg mx-auto sm:mx-0">
        {posts?.map(({ _id, title, image, author, price }) => {
          return (
            <ImageCard
              key={_id}
              id={_id}
              title={title}
              img={image}
              author={author}
              price={price}
              icon1={
                <BiSolidMessageSquareEdit
                  title="Edit"
                  className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  onClick={() => deletePost(_id)}
                />
              }
              icon2={
                <MdDelete
                  title="Delete"
                  className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  onClick={() => deletePost(_id)}
                />
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default PhotoManagement;