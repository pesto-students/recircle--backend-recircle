const express = require("express");
const {
  userSignUp,
  userLogin,
  getAllUsers,
  uploadUserProfile,
  getUser,
  userSocial,
  changePassword
} = require("../controller/userController");
const { authenticate, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/signUp").post(userSignUp);
router.route("/login").post(userLogin);
router.route("/social-login").post(userSocial);
router.route("/getAll").post(admin, authenticate, getAllUsers);
router.route("/getUser").get(authenticate, getUser);
router.route("/updateUserProfile/:userId").put(uploadUserProfile);
router.route("/:id/change-password").post(changePassword);





module.exports = router;
