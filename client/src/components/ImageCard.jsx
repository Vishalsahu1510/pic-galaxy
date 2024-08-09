// import toast from "react-hot-toast";

const ImageCard = ({ id, img, title, price, author = localStorage.getItem("author"), icon1, icon2 }) => {


  // const handleContextmenu = e => {
  //   e.preventDefault()
  //   toast.error('Right click is disabled')
  // }


  return (
    <div className=" rounded-lg bg-white h-fit shadow-lg p-2 ">
      <div className="w-full h-[200px] overflow-hidden rounded-2xl ">
        <img
          src={img}
          className="w-full h-full hover:scale-105 transition-all ease-linear duration-300 transform cursor-pointer"
          loading="lazy"
          // onContextMenu={handleContextmenu}
        />
      </div>
      <p className="font-semibold text-white  text-end mt-3 bg-black w-fit px-5 py-1 rounded-full text-sm">
        {"@" + author.charAt(0).toUpperCase() + author.slice(1)}
      </p>
      <div className="flex justify-between items-center mt-2">
        <div>
          <h3 className="text-lg font-semibold ">{title}</h3>
          <p className="text-gray-500 ">Price: ${price}</p>
        </div>
        <div className="flex gap-5 justify-center items-center">
          {icon1}
          {icon2}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;