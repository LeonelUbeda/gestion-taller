import database from './database'
import Cliente from '../Models/Cliente'
import Telefono from '../Models/Telefono'
//Cliente.sync({force: true});


//Cliente.sync({force: true})

//database.sync({force: true})
Cliente.sync({force: true})
Telefono.sync({force: true})
/*Cliente.sync({force: true}).then(() => {

    Telefono.sync({force: true})
})*/

interface ClienteTipo {
    nombre: string,
    apellido: string,
    contrasena: string,
    usuario: string,
}


let nuevaEntrada : ClienteTipo = {
    nombre: 'Leonel',
    apellido: 'Ubeda',
    contrasena: 'leonel',
    usuario: 'leonel'
}


//Cliente.create(nuevaEntrada).then(nuevaEntrada => console.log(nuevaEntrada.ID))