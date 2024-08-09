import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getOrders } from "../controllers/order.controller.js";

const router = Router();


router.route("/orders/get").get( verifyJWT, getOrders);

export default router;