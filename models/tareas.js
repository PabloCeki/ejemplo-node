const Tarea = require('./tarea'); //importamos la clase Tarea del modulo ./tarea

/**
 *  _listado:
 *      {  'uuid-123712-123123-2: { id:12, desc:asd,completadoeEN:92231 }  },
 */
/**
 * Esta es la clase principal de Tareas que contiene todos los metodos ,atributos y propiedades para 
 * realizar un Crud de tareas (create,read,update,delete)
 */



class Tareas {

    // borrar esto esta al pedo
    _listado = {  //atributo
        'abc': 123 //clave:valor
    };

    /**
     * Esta propiedad me permite cargar el array listado 
     * obtenemos la claves del objeto this._listado
     * luego recuperamos la tarea de this._listado, atravez de la propiedad  y 
     * lo agregamos al arreglo  listado
     * luego retornamos la variable listado
     */

    get listadoArr() { //el  metodo es una getter  o sea una propiedad listadoArr


        //Esto esta al pedo Inicio


        // const listado = [];
        // Object.keys(this._listado).forEach( key => {
        //     const tarea = this._listado[key];
        //     listado.push( tarea );
        // });

        // return listado;

        //final

        return Object.values(this._listado)
    }
   

    constructor() { //contructor vacios 
        this._listado = {}; // se inicializa el atributo _listado que es de tipo {} o sea objeto
    }

    /**
     * Esta funcion elimina una propiedad del objeto _listado pasandole un id
     */
    borrarTarea( id = '' ) {

        if ( this._listado[id] ) {
            delete this._listado[id];
        }
        //delete this._listado[id] // porque si la propiedad del objeto _listado no existe , no sucede nada


    }
    /**
     * Esta funcion recorre un arreglo y luego mapea los ids de cada tarea a la misma tarea
     */
    cargarTareasFromArray( tareas = [] ) {
        
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    /**
     *Esta funciona crea una tarea creando una instancia a partir de la clase Tarea
     * luego mapea el id de esa tarea creada a la tarea en si 
     * ejemplo
     * { id:1,nombre:'pablo'}
     * { 1 : {id:1,nombre:'pablo}} 
     *
     */
    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc); //creamos una instancia de la clase Tarea
        this._listado[tarea.id] = tarea; //mapeamos el id con la tarea en si
    }
    /**
     * Listamos el arreglo listadoArr y mostramos en pantalla
     */
    listadoCompleto() {
        
        console.log();
        this.listadoArr.forEach( (tarea, i) => {

            const idx = `${i + 1}`.green; //al index de la tarea le colocamos el color verde
            const { desc, completadoEn } = tarea; //descontruimos las propiedades desc y completadoEn de la tarea
            const estado = ( completadoEn ) //si completadoEn es distinto de null estado es igual a "completada" en verde
                                            //sino pendiente en rojo
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`); //utilizamos template string para mostra en pantalla 

        });         
    }
    /*
    Con esta funcion listamos las tareas pendientes o completadas
    recorremos el arreglo this.listadoArr 
    */
    listarPendientesCompletadas( completadas = true ) {

        console.log();
        let contador = 0; // declaramos una variable
        this.listadoArr.forEach( tarea => { //recorremos el arreglo listadoArr

            const { desc, completadoEn } = tarea; // descontruimos el objeto tarea en dos variables 
            const estado = ( completadoEn )  // si completadoEn es distinto a null estado es igual a completada sino lo contrario
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            if ( completadas ) { // si el atributo completado de arriba es true y completadoEn es distitno a null
                // mostrar completadas
                if ( completadoEn ) {
                    //incrementamos contador
                    //contador +=1
                    console.log(`${ (++contador + '.').green } ${ desc } :: ${ completadoEn.green }`); //mostramos en pantalla el contador,descripcion y fecha que se completo
                }
            } else {
                // mostrar pendientes
                if ( !completadoEn ) {
                    //contador +=1
                    console.log(`${ (++contador + '.').green } ${ desc } :: ${ estado }`); //mostramos contador, descripcion y el estado
                }
            }
            

        });     

    }
    //esta funcion cambia el estado de una tarea si esta completada a pendiendo y sino lo contrario
    toggleCompletadas( ids = [] ) {  

        ids.forEach( id => { //recorremos el arreglo de ids que le pasamos 

            const tarea = this._listado[id]; //hacemos referencia con ese id a la tarea del objeto _listado
            if ( !tarea.completadoEn ) { //si la propiedad completadoEn es igual a null
                tarea.completadoEn = new Date().toISOString() // completadoEn es igual a la fecha del momento
            }

        });

        this.listadoArr.forEach( tarea => { //recorremos el arreglo listadoArr

            if ( !ids.includes(tarea.id) ) { //si el arreglo de ids contiene el id de la tarea
                this._listado[tarea.id].completadoEn = null; //cambiamos la promiedad completadosEn a n ull
            }

        });


    }

}



module.exports = Tareas; //exportamos por defecto la clase Tarea
