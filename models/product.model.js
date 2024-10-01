import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    sizes: {
        type: Array,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    bestSeller: {
        type: Boolean,
    }
},{timestamps: true});

const productModel = mongoose.model.Product || mongoose.model("Product", productSchema);

export default productModel;