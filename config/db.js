import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/E-commerce`)   
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}
export default connectDB