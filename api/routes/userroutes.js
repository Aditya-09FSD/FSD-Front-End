const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const profController = require("../controllers/profileController");
const router = express.Router();

router.post("/login", authController.login);
router.get("/logout", authController.logout);
// router.get("/isloggedin", authController.isLoggedIn);

// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middle
router.use(authController.protect);
// router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", profController.getMe);
// router.patch(
//   "/updateMe",
//   userController.uploadUserPhoto,
//   userController.resizeUserPhoto,
//   userController.updateMe
// );
// router.delete("/deleteMe", userController.deleteMe);

router.use(authController.restrictTo("admin"));
router.post("/signup", authController.signup);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
