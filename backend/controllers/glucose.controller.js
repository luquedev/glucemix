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