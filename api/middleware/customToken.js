import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const decodeCustomToken = async (req,res,next) => {
    let token;
    token = req.cookies.jwt;
    if(!token){
        console.log('no token')
        return res.status(401).json({ message: "Unauthorized, No token provided" });
    }
 try {
    const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Custom Token Decoded:", decodedValue);
  
    if (decodedValue) {
        console.log(decodedValue);
      req.user = await User.findById(decodedValue.userId);
      return next(); // Proceed to the next middleware
    }
  
    // Return a 401 response if the token is invalid
    return res.status(401).json({ message: "Unauthorized, invalid token" });
   } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(500).json({ message: "Internal error" });
   }
    
}
