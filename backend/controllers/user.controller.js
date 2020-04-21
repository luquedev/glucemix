const userModel = require('../models/user.model');
const secret = require('../config/secrets');
const { validationResult } = require('express-validator'); // para poder validar el body
const bcrypt = require('bcryptjs'); // hasheo de password para seguridad
const jwt = require('jsonwebtoken'); // para crear el token y mantener sesión abierta

// CRRUD
// Create new User -> lo exporto
exports.newUser = async(req, res) => {
    // req (request)-> solicitud, res(response) -> respuesta obtenida

    const errors = validationResult(req); // ejecuto validaciones
    const hash = await bcrypt.hash(req.body.password, 14); // creo constante para hashear el password y lo guardo en hash
    if (errors.isEmpty()) {
        const username = req.body.username;
        const password = hash;
        const email = req.body.email;
        const name = req.body.name;
        const lastname = req.body.lastname;
        const phone = req.body.phone;
        const address = req.body.address;
        // registerdate -> lo asigna automáticamente
        // Llamo al modelo y le pido que inserte el user
        try {
            const result = await userModel.insertUser(username, password, email, name, lastname, phone, address);
            res.send({ "Mensaje": "Usuario creado correctamente", "ID": result.insertId });
        } catch (error) {
            res.send("Error en creación de nuevo usuario" + error);
        }
    } else {
        res.status(400).send({ "error": "El body está mal formado", "explicacion": errors });
    };
};

// Read all users -> lo exporto
exports.getAllUsers = async(req, res) => {
    try {
        const data = await userModel.getAllUsers();
        res.send(data);
    } catch (error) {
        res.send("Error mostrando todos los usuarios" + error);
    };
};

// Read user by Id -> exporto
exports.getSingleUser = async(req, res) => {
    try {
        //Hay que sacar del path el Id del usuario
        const id = req.params.id;
        //Pido al modelo que saque los datos del usuario por su id
        const user = await userModel.getUserById(id);
        //Lógica para comprobar que el usuario existe
        if (user.length === 0) {
            res.status(404).send({ "mensaje": "ese id no existe en la base de datos" });
        } else {
            res.send(user);
        }
    } catch (error) {
        res.send(error)
    }
}

// Update user by id -> exporto
exports.updateSingleUser = async(req, res) => {
    const errors = validationResult(req) // validaciones
    if (errors.isEmpty()) {
        const username = req.body.username;
        const email = req.body.email;
        const name = req.body.name;
        const lastname = req.body.lastname;
        const phone = req.body.phone;
        const address = req.body.address;
        const id = req.body.id;
        //llamamos al modelo
        try {
            const result = await userModel.updateUser(id, username, email, name, lastname, phone, address);
            if (result.affectedRows > 0) {
                res.send({ "mensaje": "Usuario modificado con éxito" });
            } else {
                res.status(404).send({ "error": "Ese id no existe" })
            }
        } catch (error) {
            res.send(error);
        }
    } else {
        res.status(400).send({ "error": "el body está mal formado", "explicación": errors });
    }
}