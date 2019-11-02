import { Op } from './Operadores'
export class MockModel{
    private static _resultados = []
    private static _nombreTabla = ''
    private static _belongsTo = []
    private static _hasMany = []
    private static _hasOne = []
    private static _pk = ''
    private static _modelo = {}
    private static _sequelize

    public static init(estructura, { sequelize, modelName}) {
        
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
                    return MockModel.handleOperaciones([Op.eq], tupla, where, llave)
                }
                case Op.not: {
                    return MockModel.handleOperaciones([Op.neq], tupla, where, llave)
                }
                
            }
        }
    }

    private static seleccion(where = {} ){
        let resultado = []
        const llaves = Object.keys(where)
        const operadores = Object.getOwnPropertySymbols(where)
        const hayLlaves = llaves.length > 0
        const hayOperadores = operadores.length > 0 
        if (!(hayLlaves || hayOperadores)) {
            resultado = MockModel._resultados
        } else {
            resultado = MockModel._resultados.filter((tupla) => {
                let resultadoBooleano = true 
 
                if (hayOperadores) {
                    resultadoBooleano = MockModel.handleOperaciones(operadores, tupla, where)
                }
                llaves.forEach(llave => {
                    if (typeof where[llave] === 'object' ) {
                        const operaciones = Object.getOwnPropertySymbols(where[llave])
                        resultadoBooleano = MockModel.handleOperaciones(operaciones, tupla, where[llave],llave)
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
            const {attributes , limit , offset ,where , include} = options
            let results = MockModel.seleccion(where)
            if (offset) {
                results = results.slice(offset)
            }
            if (limit) {
                results = results.slice(0,limit)
            }
            if (attributes) {
                results = MockModel.proyeccion(attributes, results)
            }
            return results
        }
        return MockModel.seleccion()
        
    }
    public static findOne(options?)  {
        const result = this.findAll(options)
        return [ result[0]]
    }

}


