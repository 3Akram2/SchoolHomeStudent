import jwt from 'jsonwebtoken';
const generateToken = (res,userID) =>{
    try {
        const token = jwt.sign({userID},process.env.JWT_SECRET,{
            expiresIn:'30d'
        });
        res.cookie('jwt',token,{
            httpOnly:true,
            secure:true,
            sameSite:'None',
            maxAge:30*24*60*60*1000
        
        });
    } catch (error) {
        console.error('Error generating token:', error);
    }
}
export default generateToken