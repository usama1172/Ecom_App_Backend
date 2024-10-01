import productModel from "../models/product.model.js";
import {v2 as cloudinary} from 'cloudinary'

// Route to add product
export const addProduct=async(req, res)=>{
    try {
        const {name, price, description, category,sizes,subCategory, bestSeller} = req.body;
    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter((item)=> item !== undefined)
    let imageUrl = await Promise.all(
        images.map(async (item) =>{
            let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
            return result.secure_url
        }
    ))
    const productData = {
        name,
        price: Number(price),
        description,
        category,
        sizes: JSON.parse(sizes),
        subCategory,
        bestSeller: bestSeller === 'true' ? true : false,
        image: imageUrl,
        date: Date.now()    
    }
    const product = new productModel(productData)
    await product.save()
    res.status(200).json({success: true, message: 'Product added successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Error adding product', error: error.message})
    }
}

// Route to get all products

export const getProducts=async(req, res)=>{
    try {
        const products = await productModel.find()
        res.status(200).json({success: true, products})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Error getting products', error: error.message})
    }
}

// Route to remove products

export const removeProduct=async(req, res)=>{
    try {
        const product = await productModel.findByIdAndDelete(req.body.id)
        if(!product) return res.status(404).json({success: false, message: 'Product not found'})
        res.status(200).json({success: true, message: 'Product removed successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Error removing product', error: error.message})
    }
}

// Route to get single product

export const getSingleProduct=async(req, res)=>{
    try {
        const product = await productModel.findById(req.body.id)
        if(!product) return res.status(404).json({success: false, message: 'Product not found'})
        res.status(200).json({success: true, product})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Error getting product', error: error.message})
    }
}

