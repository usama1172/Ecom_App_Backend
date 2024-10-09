import express from 'express';
import { adminLogin, createUser, login } from '../contollers/user.controller.js';
import authUser from '../middlewares/auth.js';
import adminAuth from '../middlewares/adminAuth.js';
const userRouter = express.Router();

userRouter.post('/register',createUser);
userRouter.post('/login', login);
userRouter.post('/admin', adminLogin)

export default userRouter;
