import express from 'express';
import { addToCart, getCart, updateCart } from "../contollers/cart.controller.js";
import authUser from '../middlewares/auth.js';

const cartRouter = express.Router();

// Add your routes here

cartRouter.post('/add', authUser , addToCart)
cartRouter.get('/get', authUser, getCart)
cartRouter.post('/update', authUser, updateCart)

export default cartRouter;