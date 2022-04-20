const { v4: uudiv4 } = require('uuid');
/*

Esta es la clase Tarea la cual tiene definido por defecto 3 atributos id,desc,completadoEn
Al inicializarse el contructor espera un argumento el cual es la descripcion de la tarea
luego se setean por defecto los atributos y se asigna ls descripcion (this.desc = desc)
tambien creamos un id de tipo uuid

*/
class Tarea {
    
    id = ''; // es el identificador unico de la tarea
    desc = ''; // descripcion de la tarea
    completadoEn = null; // si esta completada o no No(null) SI(fecha de cuando se completo)

    constructor( desc ) {

        this.id = uudiv4(); // esto se generar automaticamente de manera aleatoria a travez de la funcion uuidv4()
        this.desc = desc;
        this.completadoEn = null;

    }

}



module.exports = Tarea; //exportamos la clase tarea
