import User from "../models/User.js";
const addSchool = async (req,res)=>{
    // console.log('add school ',req.body.user,req.body.callerType);
    const {name, email,uid}= req.body;
    const callerId = req.user.userID;


    
    try {
        const caller = await User.findById(callerId)
        if(caller.role!=='admin'){
            throw new Error('Unauthorized: Only admins are permitted to perform this action.'); 
        }
        
        const existingUser = await User.findOne({ email });
      
        if (existingUser) {
          console.log("User already exists in the database");
          return existingUser; // Return the existing user
        }
        const newUser = new User({
          uid,
          name,
          email,
          type:"school",
          role:'user'
    
        });
        const savedUser = await newUser.save();
      
        console.log("New user created in the database:", savedUser);
        
        res.status(201).json({
          user:savedUser
        })
      } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Rethrow the error to be handled by the caller
      }
} 
const getAllUsers=async(req,res)=>{
    const callerId = req.user.userID;
    console.log(callerId)
    try {
        const caller = await User.findById(callerId)
        if(!caller || caller.role!=='admin'){
            throw new Error('Unauthorized: Only admins are permitted to perform this action.'); 
        }
        const users = await User.find({});
        res.status(201).json(users); // Send the users as a JSON response
        
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}
export{
    addSchool,
    getAllUsers
}