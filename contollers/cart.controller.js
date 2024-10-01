import userModel from "../models/user.model.js";


//add products to the user cart
export const addToCart = async (req,res) =>{
    try {
        const {userId, ItemId, size} = req.body
    const userData = userModel.findById(userId)
    let cartData = await userData.cartData
    if(cartData[ItemId]){
        if(cartData[ItemId][size]){
            cartData[ItemId][size] += 1
        }else {
            cartData[ItemId][size] = 1
    }
    } else {
        cartData[ItemId] = {}
        cartData[ItemId][size] = 1
    }
    await userModel.findByIdAndUpdate(userId, {cartData});
    res.json({success: true, message: "Product added to cart"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Error adding product to cart", error: error.message})
    }
}


//update cart

export const updateCart = async(req,res) =>{
    try {
        const {userId, itemId, size, quantity} = req.body
        const userData = userModel.findById(userId)
        let cartData = await userData.cartData
        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success: true, message: "Cart updated"})

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Error updating cart", error: error.message})
    }
}

//get user cart data

export const getCart = async (req,res) =>{
    try {
        const {userId} = req.body
        const userData = userModel.findById(userId)
        let cartData = await userData.cartData
        res.json({success: true, cartData})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Error getting cart data", error: error.message})
    }
}

