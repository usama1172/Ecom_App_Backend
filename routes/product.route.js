import express from 'express';
import { addProduct, getProducts, getSingleProduct, removeProduct } from '../contollers/product.controller.js';
import upload from '../middlewares/multer.js';
import adminAuth from '../middlewares/adminAuth.js';

const productRouter = express.Router();

// Add your routes here
productRouter.post('/add',adminAuth,upload.fields([{name: 'image1', maxCount: 1},{name: 'image2', maxCount: 1},{name: 'image3', maxCount: 1},{name: 'image4', maxCount: 1}]),addProduct)
productRouter.get('/list', getProducts)
productRouter.post('/remove', removeProduct)
productRouter.get('/single',getSingleProduct)


export default productRouter;