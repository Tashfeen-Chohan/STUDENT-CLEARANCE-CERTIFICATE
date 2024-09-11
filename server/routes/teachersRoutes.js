const router = require("express").Router()
const controller = require("../controllers/teachersController")

router.route("/register").post(controller.teacherRegister)
router.route("/login").post(controller.teacherLogin)

module.exports = router;