import jwt from 'jsonwebtoken';

const adminAuth = async(req, res, next)=>{
    try {
        const { token } = req.headers 
        if(!token) return res.status(401).json({ msg: 'Token is not provided' });
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASS){
            return res.status(401).json({success: false ,msg: 'Not authorized Login again'});
        }
       next()
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, msg: error.message});
    }
}
export default adminAuth