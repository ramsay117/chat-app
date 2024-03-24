import bcryptjs from 'bcryptjs';

import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do not match' });

    const user = await User.findOne({ username });
    if (user)
      return res.status(400).json({ message: 'Username already exists' });

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      await newUser.save();
      generateTokenAndSetCookie(newUser.id, res);
      return res.status(201).json({
        _id: newUser.id,
        username: newUser.username,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
      });
    } else return res.status(400).json({ message: 'Invalid user data' });
  } catch (error) {
    console.log(`Error in signup controller ${error.message}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: 'Invalid username or password' });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid username or password' });

    generateTokenAndSetCookie(user.id, res);
    return res.status(200).json({
      _id: user.id,
      username: user.username,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(`Error in login controller ${error.message}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('jwt');
  return res.status(200).json({ message: 'Logged out successfully' });
};
