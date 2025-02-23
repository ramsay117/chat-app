import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res, next) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();

    generateTokenAndSetCookie(newUser.id, res);

    return res.status(201).json({
      _id: newUser.id,
      username: newUser.username,
      fullName: newUser.fullName,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    generateTokenAndSetCookie(user.id, res);

    return res.status(200).json({
      _id: user.id,
      username: user.username,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie('chat-jwt');
  return res.status(200).json({ message: 'Logged out successfully' });
};
