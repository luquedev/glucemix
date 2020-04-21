const glucoseModel = require('./../models/glucose.model');
const { validationResult } = require('express-validator'); // para poder validar el body


// Create new Control
exports.newControl = async(req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty) {
        const date = req.body.date;
        const time = req.body.time;
        const mgdl = req.body.mgdl;
        const fk_user = req.body.fk_user;
        try {
            const result = await glucoseModel.newControl(date, time, mgdl, fk_user);
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