const express = require("express");
const studentController = require("../controllers/studentController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(studentController.getAllStudents)
  .post(authController.restrictTo("admin"), studentController.createStudent);

router
  .route("/:id")
  .get(studentController.getStudent)
  .patch(authController.restrictTo("admin"), studentController.updateStudent)
  .delete(authController.restrictTo("admin"), studentController.deleteStudent);

module.exports = router;
