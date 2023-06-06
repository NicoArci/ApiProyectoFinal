const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const userModel = require("../models/userModel");

//buscar y validar el usuario exista
exports.authenticateUser = (req, res) => {
const {email, password} = req.body;
userModel
.findOne({email})
.then(
    (user) => {
        //si no se encuentra el usuario, se devuelve un mensaje de error
        if (!user){//!user se niega al usuario
        return res.status(404).json({error:'user not found'})
        }
        bcrypt.compare(password, user.password, function(err, result){
            if(err){
                res.status(500).json({error:err.message})
            }else if(result){
                //si la contrasena coincide el usuario se autentifica exitosamente
                const token = jwt.sign({userId:user.id},"secreto",{expiresIn: '1h'});
                res.status(200).json({message:"authentification succesful", token})
            }else{
                // si la contrasena no coincide, se devuelve un mensaje de error
                res.status(401).json({message:"authentification failed"})
            }
        })
    }
)
.catch((err)=> res.status(500).json({error:err.message}))//error en la busqueda, no se conecto con la BD, entre otros
}
