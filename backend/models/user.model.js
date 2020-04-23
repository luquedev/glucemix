// Importo base de datos
const connection = require('./db.model');

// CRRUD -> Create, Read, Read by Id, Update, Delete

// Create -> new user -> lo creo exportándolo
exports.insertUser = (username, password, email, name, lastname, phone, address) => {
    // me devolverá una promesa
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO users (username, password, email, name, lastname, phone, address) VALUES (?, ?, ?, ? ,?, ?, ?);`, [username, password, email, name, lastname, phone, address])
            .then(result => resolve(result))
            .catch(error => reject('Error en creación de nuevo usuario: ' + error));
    });
};

// Read -> Leer todos los usuarios de la bbdd -> creo exportando
exports.getAllUsers = () => {
    // me devolverá una promesa
    return new Promise(async(resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM users`)
            resolve(data);
        } catch (error) {
            reject('Error en lectura de todos los usuarios' + error);
        }
    });
}

// Read user by id -> leer usuario por id

exports.getUserById = (userId) => {
    // devolverá promesa
    return new Promise(async(resolve, reject) => {
        try {
            const data = connection.query(`SELECT * FROM users WHERE id = ${userId}`)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    });
}

// Read user by userName -> leer usuario por id

exports.getUserByUserName = (userName) => {
    // devolverá promesa
    return new Promise(async(resolve, reject) => {
        try {
            const data = connection.query(`SELECT * FROM users WHERE username = ${userName}`)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    });
}

// Update user (por id) -> exporto
exports.updateUser = (id, newUsername, newEmail, newName, newLastname, newPhone, newAddress) => {
    return new Promise(async(resolve, reject) => {
        try {
            const sql = `UPDATE users SET username = "${newUsername}", email ="${newEmail}", name ="${newName}", lastname ="${newLastname}", phone ="${newPhone}", address ="${newAddress}" WHERE id = ${id};`
            const result = await connection.query(sql);
            resolve(result);
        } catch (error) {
            reject(error);
            console.log(error)
        }
    });
}

// Delete user (por id) -> exporto
exports.deleteUser = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const sql = `DELETE FROM users WHERE id = ${id}`;
            const result = await connection.query(sql);
            resolve(result);
        } catch (error) {
            reject(error)
        }
    })
}

// Login user
exports.userLoginModel = (username, email) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE username = ? AND email = ?;`, [username, email])
            .then(result => resolve(result))
            .catch(error => reject("Error en usuario o contraseña" + error));
    });
}