//const { json } = require("body-parser");
// const { response } = require("express");

//const User = mongoose.model('User', UserSchema);
// const User = require('../models/User')
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');


const userSignUp = async (req, res) => {
  // Signup API

// Define a signup endpoint
// app.post('/signup', async (req, res) => {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      // Create a new user with the hashed password
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phoneNumber: req.body.phoneNumber,
        profileImage: req.body.profileImage,
        role: req.body.role,
        loginType: req.body.loginType,
      });
  
      // Save the user to the database
      await user.save();
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'mysecretkey');
  
      // Send the response with the user data and token
      res.status(201).json({
        status: 'success',
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  };
  
const userLogin = async (req, res) => {
 // Login API
 try {
    // Find the user with the given email
    const user = await User.findOne({ email: req.body.email }).select('+password');

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'mysecretkey');

    // Send the response with the user data and token
    res.status(200).json({
      status: 'success',
      data: {
        userId: user._id,
        role: user.role,
        token
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};
  
const userSocial = async (req, res) => {
  const { name, email, phoneNumber, profileImage, loginType } = req.body;
  const user = await User.findOne({ email });

  try {

      if (user) {
          res.json({
              success: true,
              message: "Loggedin successfully!",
              data: {
                  _id: user._id,
                  email: user.email,
                  name: user.name,
                  phoneNumber: user.phoneNumber,
                  role: user.role,
                  profileImage: user.profileImage,
                  token: generateToken(user._id)
              }
          });
      } else {
          const user = await User.create({
              name,
              email,
              phoneNumber,
              password: "null",
              profileImage,
              loginType
          });

          res.json({
              success: true,
              message: "Loggedin successfully!",
              data: {
                  _id: user._id,
                  email: user.email,
                  name: user.name,
                  phoneNumber: user.phoneNumber,
                  role: user.role,
                  profileImage: user.profileImage,
                  token: generateToken(user._id)
              }
          });
      }
  } catch (error) {
      console.log(error)
      res.json({ success: false, message: "Something went wrong!" });
  }
}



const getAllUsers = async (req, res) => {
  try {
      const users = await User.find()

      res.json({
          success: true,
          data: users
      });
  } catch (error) {
      res.json({ success: false, message: "Something went wrong!" });
  }
};


const getUser = async (req, res) => {
// Define a route for getting a user by ID
// app.get('/users/:userId', async (req, res) => {
    try {
      // Check if the user is an admin
      if (req.user.role !== 'Admin') {
        return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      }
  
      // Find the user with the given ID
      const user = await User.findById(req.params.userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ status: 'fail', message: 'User not found' });
      }
  
      // Send the response with the user data
      res.status(200).json({ status: 'success', data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  };

const uploadUserProfile = async (req, res) => {
    try {
        // Find the user with the given ID and update their data
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    
        // Check if the user exists
        if (!user) {
          return res.status(404).json({ status: 'fail', message: 'User not found' });
        }
    
        // Send the response with the updated user data
        res.status(200).json({ status: 'success', data: user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
      }
    };

const changePassword = async (req, res) => {
    // router.post('/change_password', authMiddleware, async (req, res) => {
        try {
            // Get the user ID from the request parameters
            const userId = req.params.id;
        
            // Get the old and new passwords from the request body
            const { oldPassword, newPassword } = req.body;
        
            // Find the user in the database by ID
            const user = await User.findById(userId);
        
            // If the user doesn't exist, return a 404 error
            if (!user) {
              return res.status(404).json({ error: 'User not found' });
            }
        
            // Check if the old password is correct
            const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordCorrect) {
              return res.status(401).json({ error: 'Old password is incorrect' });
            }
        
            // Hash the new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        
            // Update the user's password in the database
            user.password = hashedNewPassword;
            await user.save();
        
            // Generate a new JSON web token with the updated user data
            const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });
        
            // Return the updated user data and token in the response
            res.json({ user, token });
          } catch (err) {
            // If there's an error, return a 500 error with the error message
            res.status(500).json({ error: err.message });
          }
        };
        

  module.exports = {
    userSignUp,
    userLogin,
    userSocial,
    getAllUsers,
    getUser,
    uploadUserProfile,
    changePassword
  }

   
