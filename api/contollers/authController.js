import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


const authUser = async (req,res) => {
const {uid}= req.user;
const isGoogleUser = req.user.firebase.sign_in_provider ;
try {
  
  const user = await User.findOne({uid})
  if(user){
    generateToken(res,user._id);
    res.status(201).json({user:user})
  } 
  else if(isGoogleUser==='google.com'){
    const newUser = await createUserFromGoogle(req.user);
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
      console.log("User already exists in the database");
      return existingUser;
    }

    const newUser = await createUserFromGoogle(req.user);
    generateToken(res, newUser._id);
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

   const registerWithEmailPass = async (req,res) => {
     const { uid } = req.user;
     const {fName , lName ,email, birthDate, phoneNumber } = req.body;
     try {
      const existingUser = await User.findOne({ email });
    
      if (existingUser) {
        console.log("User already exists in the database");
        return existingUser; // Return the existing user
      }
      const newUser = new User({
        uid,
        name:fName + lName,
        email,
        birthDate,
        phoneNumber,
  
      });
      const savedUser = await newUser.save();
    
      console.log("New user created in the database:", savedUser);
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
    console.log('logout');
  res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0)
  })
  res.status(200).json({message: "user logged out"});
  }
  
  const createUserFromGoogle = async (userData) => {
    const { uid, name, email, birthDate, picture, phoneNumber } = userData;
  
    // Handle the case where birthDate is not present in decodedToken
    const formattedBirthDate = birthDate || null; // You can use null or any default value
    // Handle the case where phoneNumber is not present in decodedToken
    const formattedPhoneNumber = phoneNumber || '';
  
    // Create a new user using the Mongoose model
    const newUser = new User({
      uid,
      name,
      email,
      birthDate: formattedBirthDate,
      profilePicUrl: picture,
      phoneNumber: formattedPhoneNumber,
    });
  
    // Save the new user to the database
    const savedUser = await newUser.save();
  
    console.log("New user created in the database:", savedUser);
  
    return savedUser;
  };

export {
  registerUserWithGoogle,
  registerWithEmailPass,
  authUser,
  logOut

}