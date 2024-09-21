const { default: mongoose } = require("mongoose");

const estudianteSchema = new mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        validate: {
            validator: function(nombre){
                //Expresion regular para texto con acentos
                return /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(nombre)
        },
        message: props => props.values + 'no es un nombre valido'
        }
    },
    email:{
        type: String,
        unique : String,
        validate: {
            validator: function(email){
                return  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: props => props.value + 'no es un correo valido '
        }
    },
    matricula:{
        type:Boolean,
        require:true,
        default:false
    },
    edad: Number,
})

module.exports = mongoose.model("Estudiante212",estudianteSchema)