const express = require("express")
const router = express.Router()
const materiaController = require("../controllers/materiaController")

router.post("/",materiaController.crearMateria)
router.get("/",materiaController.obtenerMaterias)
router.get("/:id",materiaController.obtenerMateriaPorId)
router.put("/:id",materiaController.actualizarMateria)
router.delete("/:id",materiaController.eliminarMateria)

module.exports = router