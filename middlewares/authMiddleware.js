const jwt = require("jsonwebtoken")

const authMiddleware = (req,res, next)=>{
    const token = req.header("Authorization").replace("Bearer","")
    if(!token){
        return res.status(401).json({message:"No token"})
    }
    try{
        const decode = jwt.verify(token, "secretkey")
        req.user = decoded
        next()
    }catch(error){
        res.status(401).json({message: "Token is not valid"})

    }
}

module.exports = authMiddleware