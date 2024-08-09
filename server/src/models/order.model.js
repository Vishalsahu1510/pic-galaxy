import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const orderSchema = new Schema(
  {
    purchaserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postUrl: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
      required: true,
    },
    razorpaySignature: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const  Order = model("Order", orderSchema);
export default Order;