const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")


router.post("/register",  authController.registrarUsuario)
module.exports = router 