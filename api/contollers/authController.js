import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const authUser = async (req,res) => {
const {uid}= req.user;
const isGoogleUser = req.user.firebase.sign_in_provider ;
try {
  const user = await User.findOne({uid}).populate('children parent teachers');
  if(user){
    generateToken(res,user._id);
    res.status(201).json({user:user})
  } 
  else if(isGoogleUser==='google.com'){
    const newUser = await createUserFromGoogle(req.user);
    await newUser.populate('subjects teacher childeren parent school')
      generateToken(res, newUser._id);
      res.status(201).json({ user: newUser });
  }
  else{
    throw new Error('User not found');
  }
} catch (error) {
  console.error(error)
  res.status(401).json({ error: 'Authentication failed' });
}
}
const registerUserWithGoogle = async (req, res) => {
  const { uid } = req.user;
  try {
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return existingUser;
    }
    const newUser = await createUserFromGoogle(req.user);
    await newUser.populate('children parent teachers subjects');
    generateToken(res, newUser._id);
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: 'Somthing went wrong' });
  }
};
   const registerWithEmailPass = async (req,res) => {
     const { uid } = req.user;
     const {fName , lName ,email, phoneNumber } = req.body;
     try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return existingUser; // Return the existing user
      }
      const newUser = new User({
        uid,
        name:fName +" "+ lName,
        email,
        phoneNumber,
        type:"parent",
        role:'user'
      });
      const savedUser = await newUser.save();
      await savedUser.populate('children parent teachers subjects');
      generateToken(res,savedUser._id)
      res.status(201).json({
        user:savedUser
      })
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
  const logOut = async (req,res) => {
  res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0)
  })
  res.status(200).json({message: "user logged out"});
  }
  const createUserFromGoogle = async (userData) => {
    const { uid, name, email, picture, phoneNumber } = userData;
    const formattedPhoneNumber = phoneNumber || '';
    // Create a new user using the Mongoose model
    const newUser = new User({
      uid,
      name,
      email,
      profilePicUrl: picture,
      phoneNumber: formattedPhoneNumber,
      type:"parent",
      role:'user'
    });
    // Save the new user to the database
    const savedUser = await newUser.save();  
    return savedUser;
  };
export {
  registerUserWithGoogle,
  registerWithEmailPass,
  authUser,
  logOut
}