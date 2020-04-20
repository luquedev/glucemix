// Importación Componentes para montar servidor

const express = require('express'); // Para poder construir mi servidor
const helmet = require('helmet'); // seguridad del servidor
const bodyParser = require('body-parser'); // parsear el body
const { check } = require('express-validator'); // valido el body, por ejemplo, en la creación del usuario.

// Importación Controllers
const userController = require('./controllers/user.controller');


// Server
const server = express();

// Middlewares
server.use(helmet()); // Protejo mi servidor
server.use(bodyParser.json()); // Parseo el body en formato json (objeto)

// Endpoints
// -- Users --
// Ver todos los usuarios
server.get("/user", userController.getAllUsers);
// Crear nuevo usuario
server.post('user/new', [
    check('username').isString().escape().trim(),
    check('password').isString().trim(),
    check('email').isString().trim(),
    check('name').isString().escape().trim(),
    check('lastname').isString().escape().trim(),
    check('phone').isString().trim(),
    check('address').isString().trim()
], userController.newUser);





// Definimos puerto del Server, el que yo lo indique, o el 3000
const PORT = process.env.PORT || 3000;

// Servidor preparado para escuchar (listen)
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})