
export class MockModel<T> {
    private _results: T[] = []
    public addResults(...arr) {
        this._results = arr
    }

    private seleccion(where? ) {
        let resultado = []
        if ( Object.keys(where).length === 0) {
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
    private find(options) {
        const { attributes, where } = options
        let results =this.seleccion(where) 
        if (attributes) {
            results = this.proyeccion(attributes, results)
        }
        return results
    }
    public findOne(options) {
        const result = this.find(options)
        return result[0]
    }
    findAll(options) {
        return this.find(options)
    }

}


