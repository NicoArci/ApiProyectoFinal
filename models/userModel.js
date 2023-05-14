//Se trae la libreria express guardandola en una constante
const mongoose = require("mongoose");
//Se crea la constante Uri, en donde se indica la ruta de la base de datos, en donde se van a manipular las diferentes colecciones y documentos
const uri = "agregar url coneccion a base de datos";
//se crea la conexion a la base de datos
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("Se conecto con la base de datos"))
.catch(err => console.log("Error en la conexion con la base de datos", err));
//Se crea el modelo de la coleccion que se va a utilizar
const userSchema = new mongoose.Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    name: {type:String, required:true},
    lastname: {type:String, required:true},
    typedocument: {type:String, required:true},
    numdocument: {type:Number, required:true},
    email: {type:String, required:true},
    telnumber:{type:Number, required:true},
    persontype:{type:String, required:true},
    roll:{type:Array, required:true}
});
//Se indica el nombre de la coleccion donde se va a guardar la documentacion creada
module.exports = mongoose.model('UsuariosP', userSchema);
