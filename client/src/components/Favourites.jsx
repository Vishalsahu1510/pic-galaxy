import DashboardHeader from "./DashboardHeader"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import toast from "react-hot-toast";
import axios from "axios"
import ImageCard from "./ImageCard";

import { setFavouritePosts } from "../../../store/slices/postsSlice";

////    ----react-icons-------
import { FaCartShopping } from "react-icons/fa6";
import { IoIosHeart } from "react-icons/io";

const Favourites = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.favouritePosts)


  const getFavouritePosts = async () =>{
    try {
      if (posts.length > 0) return
      const res = await axios.get(import.meta.env.VITE_API_URL + "/posts/favourites", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
      })
      const { data } = await res.data;
      dispatch(setFavouritePosts(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    getFavouritePosts()
  }, [])


  const removeFromFavourites = async (id) =>{
    try {
      const res = await axios.put(import.meta.env.VITE_API_URL + `/posts/removeFromFavourites/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        withCredentials: true
      })
      const { message } = await res.data;
      toast.success(message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }


  return (
      
      <div>
        <DashboardHeader />
        <div className="mx-8 grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts?.map(({ _id, title, image, author, price }) => {
          return (
            <ImageCard
              key={_id}
              id={_id}
              title={title}
              img={image}
              price={price}
              author={author}
              icon1={
                <FaCartShopping
                  title="Cart"
                  className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  onClick={() => purchaseImage(price, _id, image, author, title)}
                />
              }
              icon2={
                <IoIosHeart
                  title="Remove Favourite"
                  className="text-2xl text-red-900 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  onClick={() => removeFromFavourites(_id)}
                />
              }
            />
          )
        })}
      </div>
      </div>
  )
}

export default Favourites