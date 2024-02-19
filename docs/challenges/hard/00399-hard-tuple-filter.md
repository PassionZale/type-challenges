# Tuple Filter

<BtnGroup 
	issue="https://tsch.js.org/399/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/456"
/>

> 题目

Implement a type `FilterOut<T, F>` that filters out items of the given type `F` from the tuple `T`.

For example,

```ts
type Filtered = FilterOut<[1, 2, null, 3], null>; // [1, 2, 3]
```

> 解答

```ts
type FilterOut<T extends any[], F> = T extends [infer R, ...infer Rest]
  ? [R] extends [F]
    ? FilterOut<Rest, F>
    : [R, ...FilterOut<Rest, F>]
  : [];
```
