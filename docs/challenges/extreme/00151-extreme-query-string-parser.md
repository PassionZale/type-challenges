# Query String Parser

<BtnGroup 
	issue="https://tsch.js.org/151/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/21419"
/>

> 题目

You're required to implement a type-level parser to parse URL query string into a object literal type.

Some detailed requirements:

- Value of a key in query string can be ignored but still be parsed to `true`. For example, `'key'` is without value, so the parser result is `{ key: true }`.
- Duplicated keys must be merged into one. If there are different values with the same key, values must be merged into a tuple type.
- When a key has only one value, that value can't be wrapped into a tuple type.
- If values with the same key appear more than once, it must be treated as once. For example, `key=value&key=value` must be treated as `key=value` only.

> 解答

```ts
type ParseQueryString<S extends string> = S extends ""
  ? {}
  : MergeParams<SplitParams<S>>;

// e.g. 'k1=v1&k2=v2&k2=v3&k1' => ['k1=v1', 'k2=v2', 'k2=v3', 'k1']
type SplitParams<S extends string> = S extends `${infer E}&${infer Rest}`
  ? [E, ...SplitParams<Rest>]
  : [S];

// e.g. ['k1=v1', 'k2=v2', 'k2=v3', 'k1']
// => { k1: 'v1' } => { k1: 'v1', k2: ['v2', 'v3'] } => { k1: ['v1', true], k2: ['v2', 'v3'] }
type MergeParams<T extends string[], M = {}> = T extends [
  infer E,
  ...infer Rest extends string[]
]
  ? E extends `${infer K}=${infer V}`
    ? MergeParams<Rest, SetProperty<M, K, V>>
    : E extends `${infer K}`
    ? MergeParams<Rest, SetProperty<M, K>>
    : never
  : M;

// e.g. {} => { K: V }, { K: V1 } => { K: [V1, V] }, { K1: V1 } => { K1: V1, K: V }
type SetProperty<T, K extends PropertyKey, V extends any = true> = {
  [P in keyof T | K]: P extends K
    ? P extends keyof T // duplicate key exists
      ? T[P] extends V
        ? T[P] // duplicate k-v pair: no change
        : T[P] extends any[] // existing value is a tuple
        ? // append new value only if it doesn't already exist in the tuple
          V extends T[P][number]
          ? T[P]
          : [...T[P], V]
        : [T[P], V] // reassign value to tuple initialized with existing and new value
      : V // no duplicate key -> assign new k-v pair
    : P extends keyof T
    ? T[P]
    : never;
};
```
