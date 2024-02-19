# Maximum

<BtnGroup 
	issue="https://tsch.js.org/9384/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/21928"
/>

> 题目

### Description

Implement the type `Maximum`, which takes an input type `T`, and returns the maximum value in `T`.

If `T` is an empty array, it returns `never`. **Negative numbers** are not considered.

For example:

```ts
Maximum<[]>; // never
Maximum<[0, 2, 1]>; // 2
Maximum<[1, 20, 200, 150]>; // 200
```

### Advanced

Can you implement type `Minimum` inspired by `Maximum`?

> 解答

```ts
// " 1|20|200|150 extends 20 ? never : U " ==>> " 1|200|150 "
type Maximum<
  T extends any[],
  U = T[number],
  N extends any[] = []
> = T extends []
  ? never
  : Equal<U, N["length"]> extends true
  ? U
  : Maximum<T, U extends N["length"] ? never : U, [...N, unknown]>;
```
