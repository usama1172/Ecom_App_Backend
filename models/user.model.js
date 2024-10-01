import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartData: {type: Object , default: {}},
},{timestamps:true},{minimize:false});

const userModel = mongoose.model.User || mongoose.model('User', userSchema)

export default userModel;