import User from '../models/User.js';
const updateProfile = async (req,res) => {
    try {
       const { _id, name, phoneNumber } = req.body;
        if (req.file) {
          const profilePicUrl = `/images/${req.file.filename}`;
          req.body.profilePicUrl = profilePicUrl;
        }
        const user = await User.findById(_id);    
        user.name = name || user.name;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        if (req.body.profilePicUrl) {
          user.profilePicUrl = req.body.profilePicUrl;
        }
        const updatedUser = await user.save();
        await updatedUser.populate('children teachers parent subjects')
        res.status(200).json({user:updatedUser})
    } catch (error) {
        res.status(404).json({message:'user not found'})
    }    
}
const addChild = async (req, res) => {
  const parentId = req.user.userID;
  const { fName, lName, email, uid } = req.body;
  try {
    const existingUser = await User.findOne({ email }).populate('children parent teachers subjects');
    if (existingUser) {
      console.log("User already exists in the database");
      return res.status(400).json({ message: "User already exists in the database" });
    }
    const parentUser = await User.findById(parentId).populate('children teachers subjects');
    const newUser = new User({
      uid,
      name: fName + " " + lName,
      email,
      type: "student",
      role: 'user',
      parent: parentId 
    });
    const savedChild = await newUser.save();
    parentUser.children.push(savedChild);
    await parentUser.save();
    await parentUser.populate('children');
    res.status(201).json({
      user: parentUser
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: "Somthing went wrong!" });
  }
}
const viewProfile = async (req,res)=>{
const id = req.params.userId;
try {
  const tUser = await User.findById(id).populate('children teachers parent subjects');
  if(!tUser){
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(201).json({
    user:tUser
  })
} catch (error) {
  console.error('Error fetching user data:', error);
  res.status(400).json({ error: 'Somthing went wrong!' });
}
}
const addTeacher = async (req,res)=> {
  const schoolId = req.user.userID;
  const {fName , lName ,email ,uid} = req.body;
  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const user = await User.findById(schoolId).populate();
        return res.status(401).json({msg:'User already exists'}); // Return the existing user
      }
      const schoolUser = await User.findById(schoolId);
      if(schoolUser.type!=='school'){
        throw new Error('Unauthorized: Only Schools are permitted to perform this action.'); 
      }
      const newUser = new User({
        uid,
        name:fName +" "+ lName,
        email,
        type:"teacher",
        role:'user',
        parent:schoolId,
      }); 
      const savedChild = await newUser.save();
      // adding child data to parent 
       schoolUser.teachers.push(savedChild);
      await schoolUser.save();
      await schoolUser.populate('teachers subjects');
      res.status(201).json({
        user:schoolUser
      })
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
  const updateFcm = async (req, res) => {
    const userId = req.user.userID;
    const fcm = req.body.fcm;
    
    try {
        // Find the user by userId
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's FCM token
        user.fcmToken = fcm;
        await user.save();
        return res.status(200).json({ message: "FCM token updated successfully" });
    } catch (error) {
        console.error('Error updating FCM token:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export {
    updateProfile,
    addChild,
    viewProfile,
    addTeacher,
    updateFcm
}

