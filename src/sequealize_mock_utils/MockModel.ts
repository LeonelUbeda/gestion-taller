import { type } from "os"

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
    private seleccion(where? ){
        let resultado = []
        if (!where || Object.keys(where).length === 0) {
            resultado = this._results
        } else {
            return []
        }
        /*
            todo de como manejar el where
        */
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
            const {attributes , where} = options
            let results = this.seleccion(where)
            if (attributes) {
                results = this.proyeccion(attributes, results)
            }
            return results
        }
        return this.seleccion()
        
    }
    public findOne(options?) : T[] {
        const result = options ? this.find() : this.find(options)
        console.log(result)
        return [ result[0]]
    }
    findAll(options?) : T[]{
        return this.find(options)
    }

}


