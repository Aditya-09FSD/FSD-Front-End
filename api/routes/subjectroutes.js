const express = require("express");
const subjectController = require("../controllers/subjectController");
const authController = require("../controllers/authController");

const router = express.Router();
router.route("/").get(subjectController.getAllSubjects);

router.use(authController.protect);

router
  .route("/")
  .post(authController.restrictTo("admin"), subjectController.createSubject);

router
  .route("/:id")
  .get(subjectController.getSubject)
  .patch(authController.restrictTo("admin"), subjectController.updateSubject)
  .delete(authController.restrictTo("admin"), subjectController.deleteSubject);

module.exports = router;
