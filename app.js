const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const estudiantesRoutes = require("./routes/estudiantes")
const materiaRoutes = require("./routes/materia")
const authRoutes = require("./routes/auth")
const authMiddleware = require("./middlewares/authMiddleware")
const app = express()


//middleware 

app.use(express.json())
//conexion bd 
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("base de datos "))
    .catch(err => console.error(`No se pudo conectar a Mongo ` , err))
//rutas
app.use("/api/estudiantes", estudiantesRoutes)
app.use("/api/materia" ,materiaRoutes)
app.use("/api", authRoutes)
const PORT = process.env.PORT || 3000

module.exports = app

//app.listen(PORT,()=> console.log(`servidor corriendo en el puerto ${PORT}`))