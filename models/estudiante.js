const { default: mongoose } = require("mongoose");

const estudianteSchema = new mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    matricula:{
        type:Boolean,
        require:true,
        default:false
    },
    edad: Number,
})

module.exports = mongoose.model("Estudiante212",estudianteSchema)