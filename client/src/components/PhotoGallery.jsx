import { FaCartShopping } from "react-icons/fa6";
import { IoIosHeart } from "react-icons/io";
import ImageCard from "./ImageCard";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../store/slices/postsSlice";
import { useEffect } from "react";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";


const PhotoGallery = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const posts = useSelector((state) => state.posts.allPosts)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)


  const getAllImages = async () => {
    if (posts.length > 0) return;
    const res = await axios.get(import.meta.env.VITE_API_URL + "/post/getAll")
    const { data } = await res.data;
    console.log("getAllImages data :::::",data)
    dispatch(setAllPosts(data))
  }

  useEffect(() => { getAllImages() }, [])

  const purchaseImage = async (price, id, postUrl, author, title) => {
    if (!isAuthenticated) {
      toast.error("Please login to purchase asset")
      navigate("/login")
    }
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/payment/generate", { price }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        withCredentials: true
      });
      const { data } = await res.data;
      console.log("purchaseImage ::::",data)
      handlePaymentVerify(data, id, postUrl, author, title, price)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handlePaymentVerify = async (data, id, postUrl, author, title, price) => {

    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Vishal Sahu",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        console.log(response)
        try {
          const res = await axios.post(
              import.meta.env.VITE_API_URL + `/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                postId: id,
                postUrl,
                author, 
                title, 
                price
              }, 
              {
                headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`},
                withCredentials: true
              }
            );

          const data = await res.data;
          toast.success(data.message)

        } catch (error) {
          toast.error(error.response.data.message)
        }
      },
      theme: {
        color: "#5f63b8"
      }
    }

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  const addToFavourites = async (id) => {
    if (!isAuthenticated) return toast.error("Please login to add asset to favourites")
    try {
      const res = await axios.put(import.meta.env.VITE_API_URL + `/posts/addToFavourites/${id}`, {}, {
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
    <div className="my-20 bg-white flex flex-col justify-center items-center ">
      <h3 className="text-3xl font-semibold my-14">Photos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
        {posts?.map(({ _id, title, image, price, author }) => {
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
                  title="Favourite"
                  className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  onClick={() => addToFavourites(_id)}
                />
              }
            />
          );
        })}
      </div>

    </div>
  );
};

export default PhotoGallery;