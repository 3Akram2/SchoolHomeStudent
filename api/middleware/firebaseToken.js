import admin from "../config/firebase-config.js";

export const decodeToken = async (req,res,next) => {
        const token = req.headers.authorization.split(' ')[1];
       try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        console.log("=======>",decodeValue);
        if(decodeValue){
            req.user=decodeValue;
            return next();

        }
        return res.status(401).json({ message: "Unauthorized" });
       } catch (error) {
        console.error("Error decoding token:", error);
        return res.status(500).json({ message: "Internal error" });
       }
        

    }
