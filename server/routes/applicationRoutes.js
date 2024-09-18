const router = require("express").Router();
const controller = require("../controllers/applicationController");

router.route("/new").post(controller.newApplication); // Route for creating a new application
router.route("/").get(controller.getAllApplications); // Route for getting all applications
router
  .route("/:id") // Route for operations on a specific student's applications (GET, PATCH)
  .get(controller.getStudentApplications) // Get applications of a specific student by ID
  .patch(controller.updateApplication); // Update an application (status, comment)

module.exports = router;
/*Controller Binding: Each route is connected to its respective function in applicationController. These //functions are responsible for processing the incoming requests and interacting with the database.*/
