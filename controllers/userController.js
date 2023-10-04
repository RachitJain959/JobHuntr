import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import Job from '../models/jobModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPass = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPass });
};

export const updateUser = async (req, res) => {
  console.log(req.file);
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};

export const getApplicationStats = async (req, res) => {
  const newUser = await User.countDocuments();
  const jobs = await Job.countDocuments();

  //   if the user uploads a new Image, then delete the previous img
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  res.status(StatusCodes.OK).json({ users: newUser, jobs });
};
