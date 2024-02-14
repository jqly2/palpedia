import type { Primitive, NonEmptyObject, LiteralToPrimitive, JsonValue, JsonPrimitive, PartialDeep, LiteralToPrimitiveDeep, StringKeyOf, JsonObject, IsStringLiteral } from "type-fest";


export type NestObjArr<T> = NonEmptyArray<Obj<T>>;

export type NestObj<T> = NonEmptyObject<Obj<OneDeep<T>>>

export type NonEmptyArray<T> = [T, ...T[]] | [...T[], T] | [T, ...T[], T];

export type Obj<T> = Record<string,T>;


export type Data = NonNullable<JsonPrimitive>

export type OneDeep<T> = Obj<LiteralToPrimitiveDeep<T>>

export type ObjData = NonEmptyObject<Obj<NonNullable<JsonPrimitive>>>

export type ArrData = NonEmptyArray<NonNullable<JsonPrimitive>>

export type JsonObj = NestObj<NonNullable<JsonValue>> 

export type ArrJsonVal = NestObjArr<NonNullable<JsonValue>>

export type ObjJsonVal = Obj<JsonValue>

export type DeepObjData = Obj<ObjData>

export type ObjArrObj = Obj<NonEmptyArray<DeepObjData>>


//passiveCheck.ts props
export type PassiveProps = LiteralToPrimitiveDeep<PartialDeep<NonNullable<JsonValue>>>
