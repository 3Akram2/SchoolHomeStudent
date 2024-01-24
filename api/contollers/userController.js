import User from '../models/User.js';

const updateProfile = async (req,res) => {
    // try {
    //     const user = await User.findById(req.user._id);    
    //     user.name = req.body.name || user.name;
    //     user.phoneNumber = req.body.phone || user.phoneNumber;

    //     const updatedUser = await user.save();
    //     res.status(200).json({user:updatedUser})

    // } catch (error) {
    //     res.status(404).json({message:'user not found'})
    // }
    console.log('reached update profile');
res.status(200).json({message:'reached'})
    
}

export {
    updateProfile
}

