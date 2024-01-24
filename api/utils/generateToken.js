import jwt from 'jsonwebtoken';
const generateToken = (res,userID) =>{
    try {
        const token = jwt.sign({userID},process.env.JWT_SECRET,{
            expiresIn:'30d'
        });
        console.log('Generated Token:', token);
        res.cookie('jwt',token,{
            httpOnly:true,
            secure:false,
            sameSite:'None',
            maxAge:30*24*60*60*1000
        
        })
        console.log('Cookie set successfully');
    } catch (error) {
        console.error('Error generating token:', error);
    }
    


}
export default generateToken