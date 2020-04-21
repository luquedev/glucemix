// Importo base de datos
const connection = require('./db.model');

// CRRUD -> Create, Read, Read by Id, Update, Delete

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