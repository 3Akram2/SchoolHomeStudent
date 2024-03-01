import jwt from 'jsonwebtoken';
export const decodeCustomToken = async (req,res,next) => {
    let token;
    token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({ message: "Unauthorized, No token provided" });
    }
 try {
    const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
    req.user=decodedValue;
    if (decodedValue) {
      return next();
    }
    // Return a 401 response if the token is invalid
    return res.status(401).json({ message: "Unauthorized, invalid token" });
   } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(500).json({ message: "Internal error" });
   }
}
