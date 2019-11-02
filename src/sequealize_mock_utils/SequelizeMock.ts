
export class SequelizeMock {
    _dataset: object;
    static INTEGER= (val) => typeof val === 'number';
    static STRING= (length) => (val) => typeof val === 'string' && val.length < length
    static ENUM= ({ values }) => (val) => values.include(val)
    static DATE = (val) => typeof val === 'string' && true
    constructor() {
        this._dataset = {}
    }

    insertDataset(dataset: object) {
        if (typeof dataset !== 'object' || Array.isArray(dataset)) {
            throw new Error('Dataset debe ser un objeto')
        }
        for (const value of Object.values(dataset)) {
            if (!Array.isArray(value)) throw new Error('Las tablas deben ser un array')
        }
        this._dataset = dataset
        
        return this._dataset
    }

    getTable(tabla: string) {
        const tablaResultado = this._dataset[tabla]
        if (!tablaResultado ) throw new Error('La tabla no existe en el dataset')
        return tablaResultado
    }

    clearDataset() {
        this._dataset = {}
        return this._dataset
    }


}