// Importación Componentes para montar servidor

const express = require('express'); // Para poder construir mi servidor
const helmet = require('helmet'); // seguridad del servidor
const bodyParser = require('body-parser'); // parsear el body
// Importo el check de express-validator, poniéndolo entre llaves
const { check } = require('express-validator'); // valido el body, por ejemplo, en la creación del usuario.
const cookieParser = require('cookie-parser');
const cors = require('cors');


// Importación Controllers
const userController = require('./controllers/user.controller');
const glucoseController = require('./controllers/glucose.controller');


// Server
const server = express();

// Middlewares
server.use(helmet()); // Protejo mi servidor
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json()); // Parseo el body en formato json (objeto)
server.use(cookieParser());
server.use(cors());

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

// Ver usuario por username ( READ by username )
server.get('/userByName/:userName', userController.getSingleUserByuserName);

// Modificar usuario por id ( UPDATE )
server.put('/updateUser', [
    check('username'),
    check('password'),
    check('email'),
    check('name'),
    check('lastname'),
    check('phone'),
    check('address'),
    check('id')
], userController.updateSingleUser);

// Eliminar usuario por id ( DELETE )
server.delete('/deleteUser/:id', userController.deleteUserById);

// Login user -> Compruebo usuario y contraseña.
server.post('/userLogin', [
    check('username').isString(),
    check('password').isString()
], userController.userLogin);



// --------------- ENDPOINTS CONTROLS --------------------

// Crear nuevo control

server.post('/newglucose', [
    check('date'),
    check('time'),
    check('mgdl').isNumeric(),
    check('fk_user')
], glucoseController.newControl);

// Ver todos los controles ( READ )
server.get('/controls', glucoseController.getAllControls);

// Ver todos los controles por Usuario

server.get('/controls/:id', glucoseController.getControlsByUserId);

// Update control
server.put('/updateControl/', [
    check('date'),
    check('time'),
    check('mgdl').isNumeric(),
    check('id')
], glucoseController.updateControl);

// Delete control
server.delete('/deleteControl/:id', glucoseController.deleteControl);






// Definimos puerto del Server, el que yo lo indique, o el 3000
const PORT = process.env.PORT || 3000;

// Servidor preparado para escuchar (listen)
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})