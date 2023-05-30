//Se trae la libreria express guardandola en una constante
const express = require("express");
//en la constante router, se trae los metodos de express, pero solo los que se usan para las rutas .Router()
const router = express.Router();
//creacion de la constante userController para traer el archivo js donde estan los diferentes controladore get, put, etc
const userController = require("../controllers/userController");

const authController = require("../controllers/authContoller")
//Se crean las rutas para los diferentes controladores get, put, etc
router.get('/', userController.getAllUsers);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.post('/login', authController.authenticateUser)

module.exports = router;
