const Materia = require("../models/materia")

exports.crearMateria = async (req,res)=>{
    try{
        const nuevaMateria = new Materia(req.body)
        await nuevaMateria.save()
        res.status(201).json(nuevaMateria)

    }catch(error){
        res.status(500).json({error: error.message})
    }
}
exports.obtenerMaterias = async (req,res)=>{

    try{
        const materias = await Materia.find().populate("estudiantes212")
        res.status(200).json(materias)
    }catch(error){
        res.status(500).json({error: error.message})
    }


}
exports.obtenerMateriaPorId = async (req,res)=>{
    try{
        const materia = await Materia.findById(req.params.id).populate
        .populate("estudiantes")
        if(!materia){
            return res.status(404).json({message:"Materia no encontrada"})
        }
        res.status(200).json(materia)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.actualizarMateria = async (req,res)=>{
    try{
        const materia = await Materia.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!materia){
            return res.status(404)({message:"Materia no encontrada"})
        }
        res.status(200).json(materia)

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.eliminarMateria = async (req,res)=>{
    try{
        const materia = await Materia.findByIdAndDelete(req.params.id)
        if(!materia){
            return res.status(404).json({message:`materia con id: ${req.params.id} no encontrada`})
        }
        res.status(200).json({message:"Materia eliminada"})
    }catch(error){
        res.status(500).json
    }
}