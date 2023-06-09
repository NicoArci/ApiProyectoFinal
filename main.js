//Se trae la libreria express guardandola en una constante
const express = require("express");
//constante para el middeleware que se utilisara para el cors
const cors = require("cors")
//en la constante app se guardan los metodos de express
const app = express();
//se crea una constante con el numero del puerto, que se puede asignar
const port = 3000;
//creacion de la constante userRoutes para traer el archivo js donde estan las diferentes rutas
const userRoutes = require("./routes/userRoutes");
//se trae el cors para validar cualquior red que se acceda
app.use(cors(
    {
        // origin: "http://localhost:4200"
        origin: "*"//*significa que se puede acceder desde cualquier parte
    }
   
))
// se usa el app.use(express.json()) para convertir la libreria en un archivo tipo json
app.use(express.json());
//ruta para acceso a la informacion de la base de datos "/users" puede llevar mmas elementos que extiendan las rutas
app.use('/users', userRoutes);
// se usa el .listen() es usado para inicializar el servidor
app.listen(port, ()=> {console.log("El servidor se ejecuta en http://localHost:" + port)});