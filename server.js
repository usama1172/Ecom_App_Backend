import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
dotenv.config();

//App configuration
const app = express();
const port = process.env.PORT || 3000;
connectDB()
connectCloudinary()


//middleware
app.use(express.json());
app.use(cors());

//Api configuration
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)  //logging the server running message in console
})