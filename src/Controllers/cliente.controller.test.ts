import {factoryModelTodos} from './cliente.controller'
import { MockModel } from '../sequealize_mock_utils/MockModel'
import Cliente from '../Models/Interfaces/Cliente.interface'
test('factoryModelTodos devuelve una funcion', async () =>
{
    const model: MockModel<Cliente> = new MockModel<Cliente>()
    model.addResults({
        id: 1,
        nombre: 'Roberto',
        apellido: 'Sanchez',
        direccion: 'Una Dirreccion',
        tipoCliente: 'Persona',
        fechaRegistro: '2019-08-10'
    }, {
        id: 2,
        nombre: 'Roberto',
        apellido: 'Sanchez',
        direccion: 'Una Dirreccion',
        tipoCliente: 'Persona',
        fechaRegistro: '2019-08-10'
    })
    const clienteTodos = factoryModelTodos({ modelo: model })
    const result = await clienteTodos({})
    expect(result.length).toBe(2)

})
