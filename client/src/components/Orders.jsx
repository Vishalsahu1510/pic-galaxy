import { useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../store/slices/orderSlice";

const Orders = () => {
  // Sample order data
  const oldOrders = [
    {
      id: 1,
      item: "The Grass",
      price: 1000,
      email: "user1@example.com",
      name: "John Doe",
      date: "2024-06-01",
    },
    {
      id: 2,
      item: "Dancing Sunflower",
      price: 500,
      email: "user2@example.com",
      name: "Jane Smith",
      date: "2024-06-02",
    },
    {
      id: 3,
      item: "Pleasant Mood",
      price: 100,
      email: "user3@example.com",
      name: "Alice Johnson",
      date: "2024-06-03",
    },
    // Add more orders as needed
  ];

  const orders = useSelector((state) => state.order.orders)
  const role = useSelector((state) => state.auth.role)
  const dispatch = useDispatch()


  const getOrders = async () => {
    const res = await axios.get(import.meta.env.VITE_API_URL + "/orders/get", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      },
    });
    const { data } = await res.data;
    dispatch(setOrders(data))
    console.log(data)
  }

  useEffect(() => {
    getOrders()
  }, [])

  const convertDate = date => date.split("T")[0]

  return (
    <div className="">
      <DashboardHeader />
      <h1 className="text-2xl font-semibold mb-5 ml-8">Orders</h1>
      <div className="overflow-x-auto sm:ml-8">
        <table className="w-full sm:w-[80vw] bg-white rounded-lg shadow-md">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Item</th>
              <th className="py-3 px-6 text-left">{role === "seller" ? "Purchaser" : "author"} Name</th>

              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-right">Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders?.map((order) => (
              <tr
                key={order.razorpayOrderId}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {order.razorpayOrderId}
                </td>
                <td className="py-3 px-6 text-left">{order.title}</td>
                <td className="py-3 px-6 text-left">{role == "buyer" ? order.author.charAt(0).toUpperCase() + order.author.slice(1) : order.purchaser.charAt(0).toUpperCase() + order.purchaser.slice(1)}</td>
                <td className="py-3 px-6 text-left">{convertDate(order.createdAt)}</td>
                <td className="py-3 px-6 text-right">${order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;