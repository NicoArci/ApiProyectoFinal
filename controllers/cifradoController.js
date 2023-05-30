const bcrypt = require("bcryptjs");// o (bcrypt)

//cifrado de password
const saltRound = 10; //numero de rondas que se hacen para cifrar la password
const plainPassword = "password123";
bcrypt.hash(plainPassword, saltRound, function(err, hash){
    if(err){
        console.error(err)//  o throw err;
    }else {
        console.log("se creo el hash del password", hash)
    }
});
//Autentificacion con el hash
const hashedPassword = "$2b$10$";
const loginPassword = "password123";

bcrypt.compare(loginPassword, hashedPassword, function(err, result){
    if(err){
        console.error(err)
    }else if (result){
        console.log("La password es correcta")
    }else{
        console.log("La password es invalida")
    }
});
//mostrar la informacion
