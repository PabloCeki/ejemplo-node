const fs = require('fs');

const archivo = './db/data.json'; //ruta y nombre de archivo

/**
 * Funcion para guardar la base de datos en memoria hcia un archivo convirtiendolo a json (jeison)
 */
const guardarDB = ( data ) => {
    fs.writeFileSync( archivo, JSON.stringify(data) );
}
/*
Funcion para leer el archivo './db/data.json'
luego hacemos un parser para convertirlo en un objeto javascript
luego lo importamos 
*/

const leerDB = () => {
    
    if( !fs.existsSync(archivo) ){
        return null;
    }
    
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse( info ); //convertimos json (jeison) a un objeto javascript

    // console.log(data);

    return data;
}


//importamos dos funciones
module.exports = {
    guardarDB,
    leerDB
}