export interface Operator {
    readonly eq: unique symbol,
    readonly and: unique symbol,
    readonly or: unique symbol,
    readonly gt: unique symbol,
    readonly lt: unique symbol,
    readonly gte: unique symbol,
    readonly lte: unique symbol,
    readonly between: unique symbol,
    readonly is: unique symbol,
    readonly neq: unique symbol,
    readonly not: unique symbol,

}

export const Op = {
    eq: Symbol.for('eq'),
    and: Symbol.for('and'),
    or: Symbol.for('or'),
    gt: Symbol.for('gt'),
    lt: Symbol.for('lt'),
    gte: Symbol.for('gte'),
    lte: Symbol.for('lte'),
    between: Symbol.for('between'),
    is: Symbol.for('is'),
    neq: Symbol.for('neq'),
    not: Symbol.for('not'),
}






