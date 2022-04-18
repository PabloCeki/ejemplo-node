const inquirer = require('inquirer');
require('colors');

//Array lamado preguntas que contiene el menu principal
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir`
            },
            
        ]
    }
];


/**
 * Funcion  asyncrona para imprimir el menu y seleccionar una opcion listada
 * hace uso de la funcion pront del modulo inquirer
 * al final retorna la opcion selecionada
 * 
 */
const inquirerMenu = async() => {

    console.clear(); // limpia la pantalla
    console.log('=========================='.green);
    console.log('  Seleccione una opción'.white );
    console.log('==========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}
/*
Esta funciona imprime el siguiente menu con la funciona prompt del modulo inquirer
*/
const pausa = async() => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green } para continuar`
        }
    ];

    console.log('\n'); // aqui tenemos un salto de linea
    await inquirer.prompt(question);
}
/*
Esta funcion nos pide que ingremos un valor con el mensaje que nosotros le pasemos , no sin antes validad que hemos
ingresa algo, retorna true si es correcto
*/
const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) { //validacion
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question); //descontruimos la propiedad desc (descripcion)
    return desc; //retornamos la misma
}
/*
 Funcion que mapea el arreglo pasado como argumento llamado tareas
 en una objeto tipo
 {
     value: id
     name: id + descripcion
 }
*/
const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => { //genera un array nuevo mapeado

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`
        
        }
        
    });

    choices.unshift({ //unshift agrega el siguiente objeto al principio del array llamado choises
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);//devuelve el id de la opcion selecionada
    return id;
}
//funcion para armar un confirm en el cual se responde si o no
const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}   
/*
Esta funcion muestra un listado de checklist para seleccionar
pasandole un array 
retorna un objeto 
{
    value: number,
    name: string,
    checked: boolean

}
*/
const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => { //tareas a seleccionar

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [ 
        {
            type: 'checkbox', //determina que tipo de menu mostrara
            name: 'ids',
            message: 'Selecciones',
            choices //pasamos el array mapeado
        }
    ]


    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}
