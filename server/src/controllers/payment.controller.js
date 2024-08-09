import User  from "../models/user.model.js";
import Post from "../models/post.model.js";
import Order from "../models/order.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import Razorpay from "razorpay";
import crypto from "crypto";


const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const generateOrder = asyncHandler(async (req, res) => {
  const purchaserId = req.user._id;
  
  const { price } = req.body;


    let user = await User.findById(purchaserId);
    if (!user){
      throw new ApiError(404,"Please signup to make a payment");
    }
      

    const options = {
      amount: Number(price * 100),
      currency: "USD",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        throw new ApiError(500, "error while generate razorpayInstance order" && error.message);
      }
      return res.status(200).json(new ApiResponse(200, order ));
    });
});

const verifyOrder = asyncHandler(async (req, res) => {
  const purchaserId = req.user._id;
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    postId,
    postUrl,
    author,
    price,
    title,
  } = req.body;


    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;
    // console.log(isAuthentic);
    if (isAuthentic) {
      const order = await Order.create({
        purchaserId,
        postUrl,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        author,
        title,
        price,
      });
      
      let userData = await User.findByIdAndUpdate(purchaserId, {
        $push: { purchased: order._id },
      });
      let postData = await Post.findByIdAndUpdate(postId, {
        $push: { purchasedBy: purchaserId },
      });
      console.log(userData, postData);
      return res
        .status(200)
        .json( 
          new ApiResponse(200,"Payment successful" )
        );
    }
  
});

export { generateOrder, verifyOrder };