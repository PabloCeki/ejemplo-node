const arr = [
    {
        nombre: 'pablo',
        edad: 35,
        curso: 5
    },

    {
        nombre: 'faucndo',
        edad: 24,
        curso: 4
    }

]

/*
    function test(nombre){
        return 'Hola ' +nombre
    }

    const test = (nombre) => {
        
        return 'Hola ' + nombre
    }
    function suma (a,b) {
        return a+b
    }
    const suma = (a,b) => a+b
    const test = nombre => 'Hola ' + nombre


*/

const newarray = arr.map(e => ({ name: e.nombre, age: e.edad }))


const obj = {
    name:'a',
    age:'b',
    course:5
}



console.log(Object.keys(obj))

class Tareas {
    _listado = {
        abc:123,
        name:'pablo',
        age:35
    }

    get listadoArr(){
        // const listado = []
        // Object.keys(this._listado).forEach(key => {
        //     const tarea = this._listado[key]
        //     listado.push(tarea)
        // })
        // return listado
        return Object.values(this._listado)
    }

}


//const t = new Tareas()
//console.log(t.listadoArr)


const tareas = [

    {
        desc:'comprar pan',
        id:'ddshddo9'
    },{
        desc:'comprar leche',
        id:'mklsjgku'
    },{
        desc:'pasear a coco',
        id:'dkklskdl'
    }
]
const _listado = {}

function cargarTareasFromArray (tareas=[]){
    tareas.forEach(tarea => {
       _listado[tarea.id] = tarea
    })
}

cargarTareasFromArray(tareas)
delete _listado['ddshddo9']
console.log(_listado)