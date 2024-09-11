const router = require("express").Router()
const controller = require("../controllers/studentsController")

router.route("/register").post(controller.registerStudent)
router.route("/login").post(controller.loginStudent)

module.exports = router;