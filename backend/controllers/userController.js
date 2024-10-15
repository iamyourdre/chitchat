import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { ChatRoom, ChatRoomMember, Chat } from '../models/chatModel.js';
import Contact from '../models/contactModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/user/auth
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({
      where: {phone_number:phoneNumber}
    });
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user.id);
      res.status(200).json({
        id: user.id,
        name: user.name,
        phone_number: user.phoneNumber
      });
    } else {
      res.status(401).json({message:'Invalid phone number or password'});
    }
  } catch (error) {
    console.log(error)
  }
});

// @desc    Register a new user
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, phoneNumber, password } = req.body;
    const userExists = await User.findOne({where: {phone_number:phoneNumber}});
    if (userExists) {
      return res.status(400).json({message:'Phone number already used'});
    }
    const user = await User.create({
      name,
      phone_number: phoneNumber,
      password,
    });
    return res.status(200).json({message: 'Registration success, login now!'});
  } catch (error) {
    console.log(error)
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findOne({
      where: {
        id: id
      },
      attributes: ['id', 'name', 'phone_number', 'profile_picture']
    });
    return res.status(200).json({user});
  } catch (error) {
    console.log(error)
  }
});

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.phone_number = req.body.phoneNumber || user.phone_number;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      phone_number: updatedUser.phone_number,
    });
  } else {
    res.status(404).json({message:'User not found'});
  }
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};