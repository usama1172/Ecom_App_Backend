import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import validator from "validator";
import jwt from 'jsonwebtoken'
// Route to create a new user

// Function to create token for jwt
        const generateToken = (id) => {
            return jwt.sign({ id }, process.env.JWT_SECRET);
        }
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const user = await userModel.findOne({ email });
        if (user) return res.status(400).json({success: false ,message: "User already exists" });
        
        // Validate email
        if (!validator.isEmail(email)) return res.status(400).json({ success: false, message: "Invalid email" });
        
        // Validate password
        if (!validator.isLength(password, { min: 6 })) return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user document
        const newUser = new userModel({ name, email, password: hashedPassword });
        
        // Save the user to the database
        await newUser.save();
        
        // Generate and send jwt token
        const token = generateToken(newUser._id);
        res.json({ success: true, message: "User created successfully", token });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route to login 
    
   export const login = async (req, res) => {
        try {
            const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({success: false, message: "User not found"});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = generateToken(user._id);
            res.json({ success: true, message: "Logged in successfully", token });
        }
        else {
            return res.status(400).json({success: false, message: "Incorrect password"});
        }
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: error.message });
        }
        
    }

//Route for admin login

    export const adminLogin = async (req, res) => {
        try {
            const {email, password} = req.body

            if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
                const token = jwt.sign(email + password, process.env.JWT_SECRET)
                res.json({ success: true, message: "Logged in successfully", token });
            }
            else {
                return res.status(400).json({ success: false, message: "Incorrect email or password" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: error.message });
        }
    }