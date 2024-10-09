import express from "express";
import { allOrders, userOrder, updateOrderStatus, placeOrder} from "../contollers/order.controller.js";

import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";

const orderRouter = express.Router();

// Admin routes

orderRouter.post("/all", adminAuth, allOrders);
orderRouter.post("/update", adminAuth, updateOrderStatus);

// Payment features

orderRouter.post("/place", authUser, placeOrder);


// orderRouter.post("/razorpay", authUser, placeOrderRazorPay);
// orderRouter.post("/stripe", authUser, placeOrderStripe);

// User routes

orderRouter.post("/userorder", authUser, userOrder);

export default orderRouter;