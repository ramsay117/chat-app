import User from '../models/user.model.js';

export const getUsersForSidebar = async (req, res, next) => {
  try {
    const loggedInUserId = req.user.id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
    return res.status(200).json(filteredUsers);
  } catch (error) {
    next(error);
  }
};
