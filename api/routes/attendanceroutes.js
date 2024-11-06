const express = require("express");
const attendanceController = require("../controllers/attendanceController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(attendanceController.getAllAttendances)
  .post(
    authController.restrictTo("admin"),
    attendanceController.createAttendance
  );

router
  .route("/:id")
  .get(attendanceController.getAttendance)
  .patch(
    authController.restrictTo("admin"),
    attendanceController.updateAttendance
  )
  .delete(
    authController.restrictTo("admin"),
    attendanceController.deleteAttendance
  );

module.exports = router;
