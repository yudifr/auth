const express = require("express");
const router = express.Router();
const institutionController = require("../controllers/institutionController");
router
  .route("/")
  .get(institutionController.getInstitution)
  .post(institutionController.newInstitution);
router
  .route("/:id")
  .get(institutionController.getInstitutionId)
  .put(institutionController.updateInstitution)
  .delete(institutionController.deleteInstitution);
router.route("/faculty").post(institutionController.newFaculty);
router.route("/faculty/major").post(institutionController.newMajor);

module.exports = router;
