const userModel = require('../models/user.model');
const secret = require('../config/secrets');
const { validationResult } = require('express-validator'); // para poder validar el body
const bcrypt = require('bcryptjs'); // hasheo de password para seguridad
const jwt = require('jsonwebtoken'); // para crear el token y mantener sesión abierta
const moment = require('moment');

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

// Read user by userName -> exporto
exports.getSingleUserByuserName = async(req, res) => {
    try {
        //Hay que sacar del path el Id del usuario
        const userName = req.params.userName;
        //Pido al modelo que saque los datos del usuario por su id
        const user = await userModel.getUserByUserName(userName);
        //Lógica para comprobar que el usuario existe
        if (user.length === 0) {
            res.status(404).send({ "mensaje": "ese usuario no existe en la base de datos" });
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
    const hash = await bcrypt.hash(req.body.password, 14);
    if (errors.isEmpty()) {
        const username = req.body.username;
        const password = hash;
        const email = req.body.email;
        const name = req.body.name;
        const lastname = req.body.lastname;
        const phone = req.body.phone;
        const address = req.body.address;
        const id = req.body.id;
        //llamamos al modelo
        try {
            const result = await userModel.updateUser(id, username, password, email, name, lastname, phone, address);
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

// Delete user by id -> exporto
exports.deleteUserById = async(req, res) => {
    //Cojo del path params el Id que quiero eliminar
    const id = req.params.id;
    //Pido al modelo que elimine ese usuario
    try {
        const result = await userModel.deleteUser(id);
        // Compruebo que el id exista
        if (result.affectedRows > 0) {
            // Envío confirmación porque existe
            res.send({ "mensaje": `Ok, usuario con el id ${id} eliminado` });
        } else {
            res.status(404).send({ "error": "El id introducido no existe." })
        }
    } catch (error) {
        res.send(error);
    }
}


//===============================================CREATE USER TOKEN===================================

const createToken = (user) => {
    const obj = {
        id: user.id,
        expiredAt: moment().add(180, "minutes").unix()
    };
    console.log(user);
    return jwt.sign(obj, process.env.SECRET_KEY);
};


// LOGIN USUARIO -> creo exportando
exports.userLogin = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    console.log(email, password);
    console.log(errors); // para que me muestre el error por consola
    try {
        if (!errors.isEmpty()) {
            return res.status(422).send.json({ "error": "El body está mal formado", "explicación": errors });
        } else {
            const user = await userModel.userLoginModel(email);
            console.log(user);
            if (user.length > 0) {
                const coincide = bcrypt.compareSync(password, user[0].password);
                console.log(coincide);
                if (coincide) {
                    res.status(200).json({ "message": "Login ok", "token": createToken(user) });
                } else {
                    res.status(400).send({ "error": "Contraseña no coincide" });
                };
            } else {
                return res.json({ "error": "usuario o mail incorrectos" });
            }
        }
    } catch (error) {
        res.send(error);
    }
};

/*
// RECUPERACIÓN DE CONTRASEÑA -> HAY QUE COMPROBAR QUE USUARIO Y MAIL COINCIDEN
exports.userPasswordRecover = async(req, res) => {
    const errors = validationResult(errors);
    console.log(errors);
    if (errors.isEmpty()) {
        const userName = req.body.username;
        const email = req.body.email;
        try {
            const user = await userModel.getUserByUserName(userName);

            for (let i = 0; i < user.length; i++) {

                if (email === user[i].email) {

                    res.send({ "mensaje": "Datos correctos, introduce la nueva contraseña" })
                } else if (i == user.length - 1) {
                    console.log(i)
                    res.status(400).send({ "Error": "Usuario o email incorrecto. Introduce de nuevo los datos." })
                }
            }

        } catch (error) {
            console.log(error);
            res.send(error);
        }
    } else {
        res.send({ "mensaje": "Introduce usuario o correo electrónico." })
    }
}

*/