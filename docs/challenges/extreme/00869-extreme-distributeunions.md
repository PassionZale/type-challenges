# DistributeUnions

<BtnGroup 
	issue="https://tsch.js.org/869/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/11761"
/>

> 题目

Implement a type `Distribute Unions`, that turns a type of data structure containing union types into a union of
all possible types of permitted data structures that don't contain any union. The data structure can be any
combination of objects and tuples on any level of nesting.

For example:

```ts
type T1 = DistributeUnions<[1 | 2, "a" | "b"]>;
// =>   [1, 'a'] | [2, 'a'] | [1, 'b'] | [2, 'b']

type T2 = DistributeUnions<
  { type: "a"; value: number | string } | { type: "b"; value: boolean }
>;
//  =>  | { type 'a', value: number }
//      | { type 'a', value: string }
//      | { type 'b', value: boolean }

type T3 = DistributeUnions<[{ value: "a" | "b" }, { x: { y: 2 | 3 } }] | 17>;
//  =>  | [{ value: 'a' },  { x: { y: 2  } }]
//      | [{ value: 'a' },  { x: { y: 3  } }]
//      | [{ value: 'b' },  { x: { y: 2  } }]
//      | [{ value: 'b' },  { x: { y: 3  } }]
//      | 17
```

For context, this type can be very useful if you want to exclude a case on deep data structures:

```ts
type ExcludeDeep<A, B> = Exclude<DistributeUnions<A>, B>;

type T0 = ExcludeDeep<
  [{ value: "a" | "b" }, { x: { y: 2 | 3 } }] | 17,
  [{ value: "a" }, any]
>;
//  =>  | [{ value: 'b' },  { x: { y: 2  } }]
//      | [{ value: 'b' },  { x: { y: 3  } }]
//      | 17
```

> 解答

```ts
type DistributeUnions<T> = T extends unknown[]
  ? DistributeArray<T>
  : T extends object
  ? Merge<DistributeObject<T>>
  : T;

type DistributeArray<A extends unknown[]> = A extends [infer H, ...infer T]
  ? ArrHelper<DistributeUnions<H>, T>
  : [];
type ArrHelper<H, T extends unknown[]> = H extends H
  ? [H, ...DistributeArray<T>]
  : never;

type DistributeObject<O extends object, K extends keyof O = keyof O> = [
  K
] extends [never]
  ? {}
  : K extends K
  ? ObjHelper<K, DistributeUnions<O[K]>> & DistributeObject<Omit<O, K>>
  : never;
type ObjHelper<K, V> = V extends V ? { [k in K & string]: V } : never;

type Merge<O> = { [K in keyof O]: O[K] };
```
