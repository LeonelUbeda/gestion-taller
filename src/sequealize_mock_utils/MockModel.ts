import { Op } from './Operadores'
export class MockModel<T> {
    private _results: T[] = []
    public addResults(array, ...spread){
        if (spread.length > 0) {
            this._results = [array, ...spread]
        } else {
            this._results = array
        }
    }
    public getResult(): T[] {
        return this._results
    }
    private handleOperaciones(operadores: symbol[], tupla: T, where, llave? ): boolean {
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

    private seleccion(where = {} ){
        let resultado = []
        const llaves = Object.keys(where)
        const operadores = Object.getOwnPropertySymbols(where)
        const hayLlaves = llaves.length > 0
        const hayOperadores = operadores.length > 0 
        if (!(hayLlaves || hayOperadores)) {
            resultado = this._results
        } else {
            resultado = this._results.filter((tupla) => {
                let resultadoBooleano = true 
 
                if (hayOperadores) {
                    resultadoBooleano = this.handleOperaciones(operadores, tupla, where)
                }
                llaves.forEach(llave => {
                    if (typeof where[llave] === 'object') {
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

    private proyeccion(atributos: string[], seleccion: any[]) {
        return seleccion.map((tupla) => {
            const nuevoObjeto = {}
            for (const atributo in atributos) {
                nuevoObjeto[atributo] = tupla[atributo]
            }
            return nuevoObjeto
        })
    }
    private find(options?){
        if (options) {
            const {attributes , limit , offset ,where} = options
            let results = this.seleccion(where)
            if (offset) {
                results = results.slice(offset)
            }
            if (limit) {
                results = results.slice(0,limit)
            }
            if (attributes) {
                results = this.proyeccion(attributes, results)
            }
            return results
        }
        return this.seleccion()
        
    }
    public findOne(options?) : T[] {
        const result = options ? this.find(options) :  this.find() 
        return [ result[0]]
    }
    findAll(options?): T[]{
        return options ? this.find(options) : this.find() 
    }

}


