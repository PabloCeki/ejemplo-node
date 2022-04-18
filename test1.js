const objetoEjemplo = [
    {
        nombre:'facundo',
        edad:24
    }
    ,
    {
        nombre:'pablo',
        edad:35
    },
    {
        nombre:'matias',
        edad:28
    }

]
function test(lista=[]){

    const arr = lista.map ( function(e,i){
        return {
            id:i,
            name:e.nombre,
            age:e.edad
        }
    })
    
    return arr
    }


  

    const {v4:pepito} =  require('uuid');

    console.log(
        pepito()
    )