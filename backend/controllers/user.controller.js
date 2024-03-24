import User from '../models/user.model.js';

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      '-password'
    );
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(`Error in getUsersForSidebar controller ${error.message}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
