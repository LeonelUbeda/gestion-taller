import { Op } from './Operadores'
import { SequelizeMock } from './SequelizeMock'

interface OpcionesAsociacion {
    as? : string 
}
export class MockModel{
    private static _resultados = []
    public static _nombreTabla = ''
    public static _belongsTo = {}
    public static _belongsToMany = {}
    public static _hasMany = []
    public static _hasOne = []
    public static _pk = ''
    public static _modelo = {}
    public static _sequelize: SequelizeMock

    public static init(estructura, { sequelize , tableName}) {
        this._modelo = estructura
        this._sequelize = sequelize 
        this._nombreTabla = tableName
        for (const [campo, opciones] of Object.entries(estructura)) {
            if (Object.keys(opciones).includes('primaryKey')) {
                this._pk = campo
                break
            }
        }
        this._resultados = this._sequelize.getTable(this._nombreTabla)
    }


    private static handleOperaciones(operadores: symbol[], tupla, where, llave? ): boolean {
        for (const operador of operadores) {

            const condiciones = where[operador]
            switch (operador) {
                //Operadores Binarios
                case Op.or: {
                    for (const condicion of condiciones) {
                        let resultadoInnerAnd = true // Todas la condiciones dentro del objecto condicion se tienen que cumplir
                        const llavesCondicion = Object.keys(condicion)
                        for (const llave of llavesCondicion) {
                            if (tupla[llave] !== condicion[llave]) {
                                resultadoInnerAnd = false
                            } else {
                                break;
                            }
                        }
                        if (resultadoInnerAnd) {
                            return resultadoInnerAnd
                        }
                    }
                    break;
                }
                
                    
                // Operadores Unarios
                case Op.eq: {
                    if (tupla[llave] === condiciones) {
                        return true
                    }
                    break;
                }
                case Op.gt: {
                    if (tupla[llave] > condiciones) {
                            return true
                        }
                    break;
                }
                case Op.gte: {
                    if (tupla[llave] >= condiciones) {
                        return true
                    }
                    break;
                }
                case Op.lt: {
                    if (tupla[llave] < condiciones) {
                        return true
                    }
                    break;
                }
                case Op.lte: {
                    if (tupla[llave] <= condiciones) {
                        return true
                    }
                    break;
                }
                case Op.neq: {
                    if (tupla[llave] !== condiciones) {
                        return true
                    }
                    break;
                }
                case Op.is: {
                    return this.handleOperaciones([Op.eq], tupla, where, llave)
                }
                case Op.not: {
                    return this.handleOperaciones([Op.neq], tupla, where, llave)
                }
                
            }
        }
    }

    private static seleccion(where = {}) {
       let resultado = []
        const llaves = Object.keys(where)
        const operadores = Object.getOwnPropertySymbols(where)
        const hayLlaves = llaves.length > 0
        const hayOperadores = operadores.length > 0 
        if (!(hayLlaves || hayOperadores)) {
            resultado = this._resultados 
        } else {
            resultado = this._resultados.filter((tupla) => {
                let resultadoBooleano = true 
                if (hayOperadores) {
                    resultadoBooleano = this.handleOperaciones(operadores, tupla, where)
                }
                llaves.forEach(llave => {
                    if (typeof where[llave] === 'object' ) {
                        const operaciones = Object.getOwnPropertySymbols(where[llave])
                        resultadoBooleano = this.handleOperaciones(operaciones, tupla, where[llave],llave)
                    } else if (tupla[llave] !== where[llave]) {
                        resultadoBooleano = false
                    }
                    
                })
               
                
                return resultadoBooleano
          })
        }
        return resultado
    }

    private static proyeccion(atributos: string[], seleccion: any[]) {
        if (!Array.isArray(atributos)) {
            throw new Error('Atributos Los atributos tienen que ser un array de strings')
        }
        return seleccion.map((tupla) => {
            const nuevoObjeto = {}
            for (const atributo of atributos) {
                nuevoObjeto[atributo] = tupla[atributo]
            }
            return nuevoObjeto
        })
    }
    public static findAll(options?){
        if (options) {
            const { attributes, limit, offset, where, include } = options
            let results = this.seleccion(where)
            if (offset) {
                results = results.slice(offset)
            }
            if (limit) {
                if (typeof limit !== 'number') {
                    throw new Error('limit tiene que ser de tipo numerico')
                } else {
                    results = results.slice(0, limit)
                }
                
            }
            if (attributes) {
                results = this.proyeccion(attributes, results)
            }
            if (include) {
                
            }
            return results
        }
        return this.seleccion()
        
    }
    public static findOne(options?) {
        const result = [ this.findAll(options)[0] ]
        return result
    }
    /*
    Asosiaciones
    en los has_ se generan metodos para ingresar datos en la tabla que dominan
    Si estas relaciones tienen la opcion 'trough'
    Primero ingresan en la otra tabla
    y luego en la tabla intermedia crean una nueva tupla que contiene ambas pk's
    
    */
    public static belongsTo(modelo, opciones) {
        // Recibe el Modelo, agrega el campo que corresponde al pk del due;o
        let modeloEnBelongsTo = false
        if (this._belongsToMany[modelo.name]) {
            modeloEnBelongsTo = true
        }

        if (!modeloEnBelongsTo) {
            const contenido = { modelo, ...opciones }
            this._belongsToMany[modelo.name] = contenido
            const nuevoAtributo = modelo.name.toLowerCase() + (modelo._pk.charAt(0).toUpperCase() + modelo._pk.slice(1))
            const type = modelo._modelo[modelo._pk].type
            this._modelo[nuevoAtributo] = { type }
            modelo.hasOne(this)
        }
    }
    public static hasOne(modelo, opciones) {
        //Recibe el modelo del que es due;o, y llama al belongsTo del modelo hijo
        let modeloEnHas = false
        this._hasOne.forEach((valor) => {
            if (valor.modelo.name === modelo.name) {
                modeloEnHas= true
            }
        })

        if (!modeloEnHas) {
            const nombreModelo = modelo.name
            const opcionesUtilisadas = {
                as: nombreModelo.toLowerCase(),
                ...opciones
            }
            const contendio = { modelo, ...opcionesUtilisadas }
            this._hasMany.push(contendio)
            this[`add${nombreModelo}`] = (objeto) => console.log(objeto)
            this[`remove${nombreModelo}`] = (condicion) => console.log(condicion)
            this[`get${nombreModelo}`] = () => console.log('Obteniendo Data ...')
            modelo._belongsTo(this)
        }
    }
    public static hasMany(modelo, opciones: OpcionesAsociacion ) {
        //Recibe el modelo del que es due;o, y llama al belongsTo del modelo hijo
        // Revisar si el model ya esta ingresado
        let modeloEnHasMany = false
        this._hasMany.forEach((valor) => {
            if (valor.modelo.name === modelo.name) {
                modeloEnHasMany = true
            }
        })
        
       
        // Si no esta lo agrega
        if (!modeloEnHasMany) {
            const nombreModelo = modelo.name
            const opcionesUtilisadas = {
                as: nombreModelo.toLowerCase(),
                ...opciones
            }
            const contendio = { modelo, ...opcionesUtilisadas }
            this._hasMany.push(contendio)
            this[`add${nombreModelo}`] = (objeto) => console.log(objeto)
            this[`remove${nombreModelo}`] = (condicion) => console.log(condicion)
            this[`get${nombreModelo}`] = () => console.log('Obteniendo Data ...')
            modelo.belongsToMany(this)
        }
      

    }
    public static belongsToMany(modelo, opciones) {
        // Lo mismo que el belongs to
        let modeloEnBelongsTo = false
        if (this._belongsToMany[modelo.name]) {
            modeloEnBelongsTo = true
        }
        if (!modeloEnBelongsTo) {
            const contenido = { modelo, ...opciones }
            this._belongsToMany[modelo.name] = contenido
            const nuevoAtributo = modelo.name.toLowerCase() + (modelo._pk.charAt(0).toUpperCase() + modelo._pk.slice(1))
            const type = modelo._modelo[modelo._pk].type
            this._modelo[nuevoAtributo] = { type }
            modelo.hasMany(this)
       }
       

    }

}


