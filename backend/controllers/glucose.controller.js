const glucoseModel = require('./../models/glucose.model');
const { validationResult } = require('express-validator'); // para poder validar el body

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