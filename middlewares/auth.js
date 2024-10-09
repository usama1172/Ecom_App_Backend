import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) return res.status(401).json({message: 'You are not authorized to access this route'});

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.error(error)
        res.status(403).json({success: false ,message: error.message})
    }
}
export default authUser;