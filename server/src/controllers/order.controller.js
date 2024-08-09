import Order from "../models/order.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";

const getOrders = asyncHandler(async (req, res) => {
  const authorId = req.user._id;
  const authorAccountType = req.user.accountType;
  const author = req.user.username;

    let orders;
    if (authorAccountType === "buyer") {
      orders = await Order.find({ purchaserId: authorId });
    } else {
      const orderData = await Order.find({ author });
      const { username } = await User.findById(orderData[0].purchaserId);
      console.log("username", username);
      orders = orderData.map((order) => {
        return {
          author: order.author,
          title: order.title,
          price: order.price,
          createdAt: order.createdAt,
          razorpayOrderId: order.razorpayOrderId,
          postUrl: order.postUrl,
          razorpayPaymentId: order.razorpayPaymentId,
          razorpaySignature: order.razorpaySignature,
          purchaserId : order.purchaserId,
          _id : order._id,
          purchaser: username,
        };
      });
    }
    if (!orders) {
      throw new ApiError(404,"No orders found" );
    }
    return res.status(200).json(new ApiResponse(200, orders, "get orders successfully!"));
  
});

export { getOrders };




