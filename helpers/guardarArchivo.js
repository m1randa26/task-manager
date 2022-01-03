// Imports
const fs = require('fs');

// Ruta de nuestro JSON
const archivo = './db/data.json';

const guardarDB = (data) => {

    // Convierte un objecto a JSON => String
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {

    // Verificamos no existe el archivo
    if(!fs.existsSync(archivo)) {
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    return data;
}

module.exports = {
    guardarDB,
    leerDB
}