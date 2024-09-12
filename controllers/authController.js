const Usuario = require("../models/usuario")
const jwt  = require("jsonwebtoken")

exports.registrarUsuario = async (req,res)=>{
    const {username, password} = req.body
    try{
        const usuarioExiste =await Usuario.exists({username})
        if(usuarioExiste){
            return res.status(400).json({message:"El usuario ya existe"})
        }
        const nuevoUsuario = new Usuario({username,password})
        await nuevoUsuario.save()

        const token = jwt.sign({id:nuevoUsuario._id}, "secretKey" , {expiresIn:"1h"})

        res.status(201).json({token})
    }catch(error){
        res.status(500).json({error: error.message})
    }


}