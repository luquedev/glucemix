// Importo base de datos
const connection = require('./db.model');

// CRRUD -> Create, Read, Read by Id, Update, Delete

// Create -> Introducir nuevo control
exports.newControl = (date, time, mgdl, fk_user) => {
    return new Promise(async(resolve, reject) => {
        try {
            const result = connection.query(`INSERT INTO bloodglucose (date, time, mgdl, fk_user) VALUES (?, ?, ?, ?);`, [date, time, mgdl, fk_user]);
            resolve(result);
        } catch {
            reject('error en la creación del control' + error);
        }
    });
};


// Read -> Leer todos los controles de la bbdd -> creo exportando
exports.getAllControls = () => {
    // me devolverá una promesa
    return new Promise(async(resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM bloodglucose`)
            resolve(data);
        } catch (error) {
            reject('Error en lectura de todos los controles' + error);
        }
    });
}

// Read controls by id -> mostrar todos los controles -> creo exportando
exports.getControlsByUser = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await connection.query(`SELECT bloodglucose.mgdl, bloodglucose.fk_user, users.username FROM glucemix.bloodglucose, glucemix.users WHERE glucemix.bloodglucose.fk_user = glucemix.users.id AND glucemix.bloodglucose.fk_user = ${userId}`);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}