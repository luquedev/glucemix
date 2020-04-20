// Importo base de datos
const connection = require('./db.model');

// CRRUD -> Create, Read, Read by Id, Update, Delete

// Create -> new user -> lo creo exportándolo
exports.newUser = (username, password, email, name, lastname, phone, address) => {
    // me devolverá una promesa
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO users(username, password, email, name, lastname, phone, address) VALUE(?, ?, ?, ? ,?, ?, ?, );`, [username, password, email, name, lastname, phone, address])
            .then(result => resolve(result))
            .catch(error => reject('Error en creación de nuevo usuario: ' + error));
    });
};

// Read -> Leer todos los usuarios de la bbdd -> creo exportando
exports.getAllUsers = () => {
    // me devolverá una promesa
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users`)
            .then(result => resolve(result))
            .catch(error => reject('Error en lectura de todos los usuarios' + error));
    });
};