const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};



const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
}

const deleteUser = async (req, res, next) => {
  const userId = req.params.pid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete user.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for this id.', 404);
    return next(error);
  }

  try {
    await user.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete restaurant.',
      500
    );
    return next(error);
  }
  
  res.status(200).json({ message: 'Deleted User.' });
};


const getUserByEmail = async(req, res, next) => {
  const email = req;
  let user;
  try {
    user = await User.findOne({ email: req});
  } catch (err) {
    return null;
  }
    return user;
}
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserByEmail = getUserByEmail;
