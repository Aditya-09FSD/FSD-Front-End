const express = require("express");
const teacherController = require("../controllers/teacherController");
const authController = require("../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Teacher Routes
router
  .route("/")
  .get(teacherController.getAllTeachers)
  .post(authController.restrictTo("admin"), teacherController.createTeacher);

router
  .route("/:id")
  .get(teacherController.getTeacher)
  .patch(authController.restrictTo("admin"), teacherController.updateTeacher)
  .delete(authController.restrictTo("admin"), teacherController.deleteTeacher);

module.exports = router;
