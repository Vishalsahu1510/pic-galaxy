import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
          generateOrder,
          verifyOrder,
       } from "../controllers/payment.controller.js";

const router = Router();



router.route("/payment/generate").post(verifyJWT, generateOrder);
router.route("/payment/verify").post(verifyJWT,verifyOrder);


export default router;