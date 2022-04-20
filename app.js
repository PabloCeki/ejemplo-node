require('colors'); // importamos la dependencia colors

const { guardarDB, leerDB} = require('./helpers/guardarArchivo'); //importamos  las funciones del modulo require('./helpers/guardarArchivo')
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer'); //imporamos las funciones del modulo ./helpers/inquirer

const Tareas = require('./models/tareas'); //importamos la clase Tareas

//el main es una funcion asyncronica que me permite el uso de los await , main retorna una promesa
const main = async() => {

    let opt = ''; // declaramos una variables tipo string vacio (comillas vacias)
    const tareas = new Tareas(); // creamos la instancia tareas de la clase tareas

    const tareasDB = leerDB(); //leemos el archivos que esta en db/data.json

    /*
    si no me devuelve un valor nulo cargo el contenido del archivo a travez de la funcion cargarTareasFromArray de la la clase 
    tareas
    
    */
    if ( tareasDB ) { // cargar tareas
        tareas.cargarTareasFromArray( tareasDB );
    }
    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) { //opt tiene la opcion seleccionada del menu 1,2,3,etc
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción:'); //aqui leemos el teclado y ingresamos una descripcion
                tareas.crearTarea( desc ); // creamos una tarea utilizando una funcion de la clase tareas llamada crearTarea() le pasamos la descripcion (desc)
            break;

            case '2':
                tareas.listadoCompleto(); //mostramos el listado completo
            break;
            
            case '3': // listar completadas
                tareas.listarPendientesCompletadas(true); //aqui a travez del metodo listarPendientesCom... le pasamos el argumento true
            break;

            case '4': // listar pendientes
                tareas.listarPendientesCompletadas(false); //aqui las pendientes pasandole false
            break;

            case '5': // completado | pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr ); //mostramos el checklist para completar tarea , elegimos y con la barra espaciadora selecionamos
                tareas.toggleCompletadas( ids ); //pasamos isds de la tarea a la funcion toogleCompletadas
            break;
                       
            case '6': // Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr ); //listamos todas las tareas y selecionamos la que queremos borrar esto ns devuelve el id de la tarea
                if ( id !== '0' ) {
                    const ok = await confirmar('¿Está seguro?');//confirma lo toma del modulo inquirer personalizado 
                    if ( ok ) {
                        tareas.borrarTarea( id ); //borramos la tarea
                        console.log('Tarea borrada');
                    }
                }
            break;
        
        }


        guardarDB( tareas.listadoArr ); //guardamos de nuevo la lista al archivo db/data.json

        await pausa();//pausamos 

    } while( opt !== '0' );


  

}


main();

