// Importación Componentes para montar servidor

const express = require('express'); // Para poder construir mi servidor
const helmet = require('helmet'); // seguridad del servidor
const bodyParser = require('body-parser'); // parsear el body
const { check } = require('express-validator'); // valido el body, por ejemplo, en la creación del usuario.

// Importación Controllers
const userController = require('./controllers/user.controller');
const glucoseController = require('./controllers/glucose.controller');


// Server
const server = express();

// Middlewares
server.use(helmet()); // Protejo mi servidor
server.use(bodyParser.json()); // Parseo el body en formato json (objeto)

// --------------- ENDPOINTS USERS --------------------
// -- Users -- CRRUD

// Crear nuevo usuario ( CREATE )
server.post('/newUser', [
    check('username'),
    check('password'),
    check('email'),
    check('name'),
    check('lastname'),
    check('phone'),
    check('address')
], userController.newUser);

// Ver todos los usuarios ( READ )
server.get("/user", userController.getAllUsers);

// Ver usuario por id ( READ by Id )
server.get('/user/:id', userController.getSingleUser);

// Modificar usuario por id ( UPDATE )
server.put('/updateUser', [
    check('username'),
    check('email'),
    check('name'),
    check('lastname'),
    check('phone'),
    check('address'),
    check('id')
], userController.updateSingleUser);

// Eliminar usuario por id ( DELETE )
server.delete('/user/:id', userController.deleteUserById);

// --------------- ENDPOINTS CONTROLS --------------------

// Crear nuevo control

server.post('/newglucose', [
    check('date'),
    check('time'),
    check('mgdl').isNumeric(),
    check('fk_user'),
], glucoseController.newControl);




// Ver todos los controles ( READ )
server.get('/controls', glucoseController.getAllControls);

// Ver todos los controles por Usuario

server.get('/controls/:id', glucoseController.getControlsByUserId);








// Definimos puerto del Server, el que yo lo indique, o el 3000
const PORT = process.env.PORT || 3000;

// Servidor preparado para escuchar (listen)
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})