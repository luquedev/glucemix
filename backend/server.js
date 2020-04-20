// Importación Componentes para montar servidor

const express = require('express'); // Para poder construir mi servidor
const helmet = require('helmet'); // seguridad del servidor
const bodyParser = require('body-parser'); // parsear el body

// Importación Controllers



// Server
const server = express();

// Middelwares
server.use(helmet()); // Protejo mi servidor
server.use(bodyParser.json()); // Parseo el body en formato json (objeto)

// Endpoints

// Definimos puerto del Server, el que yo lo indique, o el 3000
const PORT = process.env.PORT || 3000;

// Servidor preparado para escuchar (listen)
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})