// CONEXIÓN CON LA BASE DE DATOS
// Importo librerías de npm y del archivo secrets (datos de la bbdd)
const mysql = require('mysql');
const secrets = require('../config/secrets');

// WRAPPER --> PARA PODER TRABAJAR CON PROMESAS CON mysql
class dataBase {
    constructor(config) {
        this.connection = mysql.createPool(config); // createPool es para poder hacer varias conexiones(Mario)
    };
    // query --> ABRO CONEXIONES
    query(sql, data) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, data, (error, result) => {
                if (error) {
                    return reject(error);
                } else {
                    resolve(result);
                };
            });
        });
    };


    // CIERRO CONEXIONES
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((error) => {
                if (error) {
                    return reject(error);
                } else {
                    resolve();
                };
            });
        });
    };
};

// Importo configuración base de datos.
const connection = new dataBase(secrets);

// Exporto la conexión a la bbdd.
module.exports = connection;