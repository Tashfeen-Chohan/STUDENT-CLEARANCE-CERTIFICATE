const router = require("express").Router();
const controller = require("../controllers/applicationController");

router.route("/libraries-hostels").get(controller.getAllLibrariesAndHostels)
router.route("/new").post(controller.newApplication);
router.route("/").get(controller.getAllApplications);
router
  .route("/:id")
  .get(controller.getStudentApplications)
  .patch(controller.updateApplication);

module.exports = router;
