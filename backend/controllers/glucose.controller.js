const glucoseModel = require('./../models/glucose.model');
const { validationResult } = require('express-validator'); // para poder validar el body


// Create new Control
exports.newControl = async(req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty) {
        const date = req.body.date;
        const time = req.body.time;
        const mgdl = req.body.mgdl;
        try {
            const result = await glucoseModel.newControl(date, time, mgdl);
            res.send({ "Mensaje": "Control creado correctamente" });
        } catch (error) {
            res.send("Error en creación de nuevo usuario" + error);
        }
    } else {
        res.status(400).send({ "error": "El body está mal formado", "explicacion": errors });
    };
};

// Read all controls
exports.getAllControls = async(req, res) => {
    try {
        const data = await glucoseModel.getAllControls();
        res.send(data);
    } catch (error) {
        res.send("Error mostrando los controles." + error);
    };
};

// Read controls by UserId -> lo exporto
exports.getControlsByUserId = async(req, res) => {
    try {
        //hay que sacar del path el Id del usuario
        const id = req.params.id;
        const controls = await glucoseModel.getControlsByUser(id);
        // Lógica para comprobar que el usuario existe
        if (controls.length === 0) {
            res.status(404).send({ "mensaje": "ese id de usuario no existe." });
        } else {
            res.send(controls);
        }
    } catch (error) {
        res.send(error);
    }
}

// Read controls by Username -> lo exporto
exports.getControlsByUserName = async(req, res) => {
    try {
        //hay que sacar del path el Id del usuario
        const userName = req.params.username;
        const controls = await glucoseModel.getControlsByUserName(userName);
        // Lógica para comprobar que el usuario existe
        if (controls.length === 0) {
            res.status(404).send({ "mensaje": "El nombre de usuario no existe o no tiene controles registrados." });
        } else {
            res.send(controls);
        }
    } catch (error) {
        res.send(error);
    }
}

// Update control by id --> lo exporto
exports.updateControl = async(req, res) => {
    const errors = validationResult(req); // validaciones
    // compruebo que no haya errores
    if (errors.isEmpty()) {
        const date = req.body.date;
        const time = req.body.time;
        const mgdl = req.body.mgdl;
        const id = req.params.id;
        // llamamos al modelo para hacer las comprobaciones
        try {
            const result = await glucoseModel.updateControlById(id, date, time, mgdl);
            console.log(result);
            if (result.affectedRows > 0) {
                res.send({ "mensaje": "Control modificado con éxito" });
            } else {
                res.status(404).send({ "error": "El id no existe." });
            }
        } catch (error) {
            res.send(error);
        }
    }
}

// Delete control by Id -> lo exporto
exports.deleteControl = async(req, res) => {
    const id = req.params.id; // cojo del path params el id que quiero eliminar
    // pido al modelo que elimine ese control
    try {
        const result = await glucoseModel.deleteControlById(id);
        if (result.affectedRows > 0) {
            res.send({ "mensaje": `Control con el id ${id} eliminado` });
        } else {
            res.status(404).send({ "error": "el id introducido no existe" });
        }

    } catch (error) {
        res.send(error);
    }
}