const express = require("express");
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");

const router = express.Router();
router.route("/").get(courseController.getAllCourses);
router.use(authController.protect);

router
  .route("/")

  .post(authController.restrictTo("admin"), courseController.createCourse);

router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(authController.restrictTo("admin"), courseController.updateCourse)
  .delete(authController.restrictTo("admin"), courseController.deleteCourse);

module.exports = router;
