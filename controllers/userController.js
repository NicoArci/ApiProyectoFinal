//se traer el userModel de js para poder utilizarlo en los diferentes metodos http
const { json } = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")
//se crean los diferentes controladore para los metodos get, put, etc

//Get
exports.getAllUsers = (req, res) => {
    userModel.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({error:err.message}));
}
//post
exports.createUser = (req,res) => {
    const {username, password, name, lastname, typedocument, numdocument, email, telnumber,
    persontype, roll} = req.body;
    const saltRounds =10;
    bcrypt.hash(password, saltRounds, function(err,hash){
        if(err){
            res.status(500).json({error:err.message})
        }else{
            const newUser = new userModel({
                username,
                password:hash,
                name,
                lastname,
                typedocument,
                numdocument,
                email,
                telnumber,
                persontype,
                roll
            });

            newUser.save()
            .then(() => res.status(201).json({success:"created"}))
            .catch(err => res.status(500).json({error:err.message}));
        }
    })
}
//push(Put)
exports.updateUser = (req,res) => {
    const {id} = req.params;
    const {username, password, name, lastname, typedocument, numdocument, email, telnumber,persontype, roll} = req.body;
    const saltRounds =10;
    bcrypt.hash(password,saltRounds,function(err,hash){
        if(err){
            res.status(500).json({error:err.message})
    }else{
        userModel.findByIdAndUpdate(id, {username, password:hash, name, lastname, typedocument, numdocument, email, telnumber,persontype, roll}, {new:true} )
    .then(user => {
        if(!user)throw new Error(`user with ID ${id} not found`);
        res.status(200).json({user});
    })
    .catch(err => res.status(404).json({error:err.message}));
    }
})
    

}
//Delete
exports.deleteUser = (req,res) => {
    const {id} = req.params;
    userModel.findByIdAndDelete(id)
    .then(user => {
        if(!user)throw new Error(`user with ID ${id} not found`);
        res.status(200).json({message:"User deleted"});
    })
    .catch(err => res.status(404).json({error:err.message}))
}

exports.getUser = (req,res) => {
    const {email} = req.params;
    userModel.findOne({email})
    .then(user => res.json(user))
    .catch(err => res.status(404).json({error:err.message}))
}