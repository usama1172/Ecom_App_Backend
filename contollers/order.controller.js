import orderModel from "../models/order.model.js"
import userModel from "../models/user.model.js"

//placing orders using COD method
export const placeOrder = async (req, res) =>{
    try {
        const {userId, items, amount, address} = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData:{}})
        res.json({success: true, message: "Order placed successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Error placing order", error: error.message})
        
    }

}


//placing orders using stripe method

// export const placeOrderStripe = async (req, res) =>{

// }

// place orders using razor pay method

// export const placeOrderRazorPay = async (req, res) =>{

// }

// All order data for Admin panel

export const allOrders = async (req, res) =>{
    try {
        const order = await orderModel.find({})
        res.json({success: true, order})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Error getting order data", error: error.message})
    }

}

// Order details for User

export const userOrder = async (req, res) =>{
    try {
        const { userId } = req.body
        const orderData = await orderModel.find({userId})
        res.json({success: true, orderData})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Error getting order data", error: error.message})
    }

}

// update order status for admin panel

export const updateOrderStatus = async (req, res) =>{
    try {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message: "Order status updated"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Error updating order status", error: error.message})
        
    }
  

}



