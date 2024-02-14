import { stringify } from "querystring";
import { JsonValue, PickDeep } from "type-fest";


export const isString = (query: string | number | boolean): query is string  => {
    return query as string !== undefined;
}

export const isNonEmptyArray = (query:unknown): query is unknown[] => {
    return Array.isArray(query) && query.length > 0;
}

export const merge = <Type>(a:Array<Type>, b:Array<Type>, predicate = (a:Type, b:Type) => a === b) => {
    const c = [...a]; // copy to avoid side effects
    // add all items from B to copy C if they're not already present
    b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
    return c;
}

// merge(['a1', 'b', 'c'], ['c', 'x', 'd']);
// => ['a', 'b', 'c', 'x', 'd']

// merge([{id: 1}, {id: 2}], [{id: 2}, {id: 3}], (a, b) => a.id === b.id);
// [{id: 1}, {id: 2}, {id: 3}]