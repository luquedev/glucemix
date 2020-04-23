const jwt = require('jsonwebtoken');
const moment = require('moment');
const fs = require('fs');
const secret = require('../config/secrets');

// token head
exports.checkToken = (req, res, next) => {
    if (!req.headers['user-token']) {
        return res.json({ "error": "se debe incluir el token" });
    }
    const userToken = req.headers['user-token'];
    let obj = {};
    try {
        obj = jwt.verify(userToken, secret.jwt_clave)
    } catch (error) {
        return res.json({ "error": "token incorrecto" });
    }
    if (moment().unix() > obj.expiredAt) {
        return res.json({ "error": "Token caducado" });
    }
    req.userId = obj.id;
    fs.appendFileSync('./registro.log', `${moment().format('DD-MM-YYYY hh:mm:ss')} USER:${req.userId} ${req.method} ${req.url}\n`)
    next();
}