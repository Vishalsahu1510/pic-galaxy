import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "../DashboardHeader";
import ImageCard from "../ImageCard";
import { IoArrowDownCircle } from "react-icons/io5";
import { useEffect } from "react";
import { logout } from "../../../store/slices/authSlice";
import toast from "react-hot-toast";
import { setMyPosts } from "../../../store/slices/postsSlice";
import axios from "axios";



const PhotosPurchased = () => {

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
      console.log("getMyPosts data====",data)
      dispatch(setMyPosts(data))

    } catch (error) {
      toast.error(error.response.data.message)
      dispatch(logout())
    }
  }

  useEffect(() => {
    getMyPosts()
  }, [])

  const downloadImage = async (image, title) => {
    try {
      // Fetch the image from the provided URL
      const response = await fetch(image);
      if (!response.ok) {
        throw new Error(`Could not fetch image: ${response.statusText}`);
      }
      // Convert the image response to a Blob
      const blob = await response.blob();
      // Create an object URL for the Blob
      const url = URL.createObjectURL(blob);
      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.jpg`;
      // Append the anchor to the document body
      document.body.appendChild(a);
      // Trigger a click on the anchor element to start the download
      a.click();
      // Remove the anchor from the document body and revoke the object URL
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  return (
    <div>
      <DashboardHeader />

      {/* LISTING ALL THE PHOTOS PURHCAED HERE */}
      <div className="mx-8 grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          posts?.map(({ _id, title, postUrl, author, price }) => <ImageCard key={_id} title={title} img={postUrl} price={price} author={author} icon2={<IoArrowDownCircle
            title="Favourite"
            className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
            onClick={() => downloadImage(postUrl, title)}
          />} />)
        }
      </div>
    </div>
  )
}

export default PhotosPurchased;