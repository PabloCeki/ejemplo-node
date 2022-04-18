require('colors'); //importamos todo el modulo para manipular colores

/*
Esta funcion me general el menu principal , retorna una promesa 
Utiliza el modulo nativo 'readline' para manipular la entrada del teclado

*/

const mostrarMenu = () => {

    return new Promise( resolve => {

        console.clear();
        console.log('=========================='.green);
        console.log('  Seleccione una opción'.green);
        console.log('==========================\n'.green);

        console.log(`${ '1.'.green } Crear tarea`);
        console.log(`${ '2.'.green } Listar tareas`);
        console.log(`${ '3.'.green } Listar tareas completadas`);
        console.log(`${ '4.'.green } Listar tareas pendientes`);
        console.log(`${ '5.'.green } Completar tarea(s)`);
        console.log(`${ '6.'.green } Borrar tarea`);
        console.log(`${ '0.'.green } Salir \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opción: ', (opt) => { //funcion question a la que le pasamos un callback y me retorna
            readline.close();                                   // el texto ingresa , luego resolvemos la promesa
            resolve(opt);
        })

    });

    

}
//Funcio que retorna una promesa, mostrado el mensaje siguiente, presionando enter, resolvemos 
const pausa = () => {

    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${ 'ENTER'.green } para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })
    });
}

//exportamos las siguientes funciones
module.exports = {
    mostrarMenu,
    pausa
}