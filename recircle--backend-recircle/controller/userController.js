//const { json } = require("body-parser");
// const { response } = require("express");

//const User = mongoose.model('User', UserSchema);
// const User = require('../models/User')
const { User } = require("../models/User");

//Signup
// const signUp = async (req, res) => {
//     try {
//         const { name, email, password, phoneNumber, role, active, profileImage} = req.body;
//         const user = await User.Create({
//             name,
//             email,
//             password,
//             phoneNumber,
//             role,
//             active,
//             profileImage
//         });

//         res.json ({
//             success : true,
//             message : "Registered User successfully",
//             data : {
//                 id : user.id,
//                 email : user.email,
//                 name : user.name,
//                 phoneNumber : user.phoneNumber,
//                 role : user.role,
//                 profileImage : user.profileImage,
//             }
//         });
//     } catch (error) { 
//         res.json ({success: false, message: "User already exists"})
//     }
// }
 const signUp = (req, res) => {
  let user = new user ({
    name : req.body.name,
    email : req.body.email,
    phoneNumber : req.body.phoneNumber,
    profileImage : req.body.profileImage
  })
  user.save()
  .then(response => {
    res.json ({
      message: "User added succesfully"
    })
  }) 
  .catch(error => {
    res.json ({
      message: "Error in adding user"
    })
  })
 }

  //Get all users
  const UserList = async (req, res) => {
    User.find()
    .then(response => {
      res.json({
        response
      })
    })
    .catch(_error => {
        res.json ({
          message: "An error occured!"
        })
    })
  }

  //Get user by ID
  const UserById = async (req, res) => {
    let userID = req.body.userID
    User.findById(userID)
    .then(response => {
      res.json ({
        response
      })
    })
    .catch(
      error => {
        res.json ({
          message : "An error occured!"
        })
      }
    )
  }
//
  //Add an employee
  const addUser = (req, res) => {
    let user = new User ({
      name: req.body.name,
      designation: req.body.designation,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
      branch: req.body.branch
    })
    user.save()
    .then(() => {
        res.json({message: 'Employee added succesfully'
        })
    }).catch(() => {
      res.json ({
        message: 'An error Occured!'
      })
    })
  }

//Update a user
const updateUser = (req, res) => {
  let userID = userID

  let updatedData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
    branch: req.body.branch
  }
  User.findByIdAndUpdate(userID, {$set: updatedData})
  .then(() => {
    res.json({
      message: 'User updated successfully'
    })
    .catch(()=> {
      res.json ({
        message: 'An error occured!'
      })
    })
  })
}

//Delete an employee

const deleteUser = (req, res) => {
  let userID = req.body.userID
  User.findByIdAndRemove(userID)
  .then(() => {
    res.json({
      message: 'User deleted succuessfully'
    })
    .catch(() => {
      res.json ({
        message: 'An error occured!'
      })
    })
  })
}
  module.exports = {
    signUp,
    addUser,
    UserList,
    UserById,
    updateUser,
    deleteUser
  }

   


  //Update a user
  // app.patch('/users/:id', async (req, res) => {
  //   const updates = Object.keys(req.body);
  //   const allowedUpdates = ['name', 'email', 'password', 'phoneNumber', 'profileImage', 'role', 'loginType', 'active', 'ScrapOrders'];
  //   const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  
  //   if (!isValidOperation) {
  //     return res.status(400).send({ error: 'Invalid updates!' });
  //   }
  
  //   try {
  //     const user = await User.findById(req.params.id);
  //     if (!user) {
  //       return res.status(404).send();
  //     }
  
  //     updates.forEach(update => user[update] = req.body[update]);
  //     await user.save();
  
  //     res.send(user);
  //   } catch (error) {
  //     res.status(400).send(error);
  //   }
  // });

  //Delete a user

  // app.delete('/users/:id', async (req, res) => {
  //   try {
  //     const user = await User.findByIdAndDelete(req.params.id);
  //     if (!user) {
  //       return res.status(404).send();
  //     }
  //     res.send(user);
  //   } catch (error) {
  //     res.status(500).send(error);
  //   }
  // });

