const router = require("express").Router()
const controller = require("../controllers/studentsController")

router.route("/register").post(controller.newStudent)

module.exports = router;