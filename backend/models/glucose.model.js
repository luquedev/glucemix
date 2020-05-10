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

// Read controls by user id -> mostrar todos los controles -> creo exportando
exports.getControlsByUser = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await connection.query(`SELECT bloodglucose.date, bloodglucose.time, bloodglucose.mgdl, bloodglucose.fk_user, users.username FROM glucemix.bloodglucose, glucemix.users WHERE glucemix.bloodglucose.fk_user = glucemix.users.id AND glucemix.bloodglucose.fk_user = ${userId}`);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}

// Read controls by username -> mostrar todos los controles por username-> creo exportando
exports.getControlsByUserName = (username) => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await connection.query(`SELECT bloodglucose.mgdl, bloodglucose.fk_user, users.username, bloodglucose.date, bloodglucose.time, bloodglucose.id FROM glucemix.bloodglucose, glucemix.users WHERE glucemix.bloodglucose.fk_user = glucemix.users.id AND glucemix.users.username = "${username}"`);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}



// Update control by Id -> modificar un control de un usuario -> creo exportando
exports.updateControlById = (id, newDate, newTime, newMgdl) => {
    return new Promise(async(resolve, reject) => {
        try {
            const sql = `UPDATE bloodglucose SET date ="${newDate}", time = "${newTime}", mgdl = "${newMgdl}" WHERE bloodglucose.id = ${id}`;
            const result = await connection.query(sql);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

// Delete control by Id -> creo exportando
exports.deleteControlById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const sql = `DELETE FROM bloodglucose WHERE id = ${id}`;
            const result = await connection.query(sql);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}