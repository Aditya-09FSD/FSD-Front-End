const express = require("express");
const panelController = require("../controllers/panelController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(panelController.getAllPanels)
  .post(authController.restrictTo("admin"), panelController.createPanel);

router
  .route("/:id")
  .get(panelController.getPanel)
  .patch(authController.restrictTo("admin"), panelController.updatePanel)
  .delete(authController.restrictTo("admin"), panelController.deletePanel);

module.exports = router;
