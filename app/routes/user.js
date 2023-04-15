const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
router.route("/current-user").get(authController.getAnyLoggedInUser);
router.route("/logout").get(authController.logout);
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/update-user").put(authController.updateUser);

module.exports = router;
