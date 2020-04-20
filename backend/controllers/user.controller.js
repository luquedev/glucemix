const userModel = require('../models/user.model');
const secret = require('../config/secrets');
const { validationResult } = require('express-validator'); // para poder validar el body
const bcrypt = require('bcryptjs'); // hasheo de password para seguridad
const jwt = require('jsonwebtoken'); // para crear el token y mantener sesión abierta

// CRRUD
// Create new User -> lo exporto
exports.newUser = async(req, res) => {
    // req (request)-> solicitud, res(response) -> respuesta obtenida
    // creo constante para hashear el password y lo guardo en hash
    const hash = await bcrypt.hash(req.body.password, 14);

    // body
    const username = req.body.username;
    const password = hash;
    const email = req.body.email;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const phone = req.body.phone;
    const address = req.body.address;
    // registerdate -> lo asigna automáticamente

    // Creo constate errors para poder validar
    const errors = validationResult(req);

    // Comprobación de que un usuario no esté duplicado
    const duplicateUser = await userModel.newUser();

    try {
        if (!errors.isEmpty()) {
            return res.status(422).json({ "Error": "El body está mal creado", "Causa": errors });
        } else {
            if (email !== secret.contact) {
                if (duplicateUser[0].email !== email) {
                    const data = await userModel.newUser(username, password, email, name, lastname, phone, address);
                    res.send({ "Mensaje: ": "Usuario creado correctamente!!!", "ID": data.insertId });
                } else {
                    res.send({ "Mensaje": "Usuario duplicado, mismo e-mail!", "email": email });
                };
            } else {
                const data = await userModel.newUser(username, password, email, name, lastname, phone, address);
                res.send({ "Mensaje": "Usuario creado correctamente!!!", "ID": data.insertId });
            };
        };
    } catch (error) {
        res.send("Error en creación de nuevo usuario" + error);
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