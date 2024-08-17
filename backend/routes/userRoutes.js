const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  updateProfile,
  changeCart,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/cart/:id").post(changeCart);

// router.route("/authenticate").get(isAuthenticatedUser,authenticated)

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

module.exports = router;
