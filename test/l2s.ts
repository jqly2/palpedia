import { LiteralToPrimitive } from 'type-fest'

function plus<T extends number | bigint | string>(x: T, y: T): LiteralToPrimitive<T> {
	return x + (y as any);
}

plus('a', 'b'); // string
plus(1, 2); // number

console.log(typeof plus('a', 'b'))
console.log(typeof plus(1, 2))
const fruits = ["Apple", "Orange", "Pear"] as const;

console.log(typeof fruits)