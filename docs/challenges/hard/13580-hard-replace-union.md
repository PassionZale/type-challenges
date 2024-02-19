# Replace Union

<BtnGroup 
	issue="https://tsch.js.org/13580/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/21337"
/>

> 题目

Given an `union of types` and `array of type pairs` to replace (`[[string, number], [Date, null]]`), return a new union replaced with the `type pairs`.

> 解答

```ts
type UnionInType<T, U extends [any, any][]> = U extends [
  infer A extends [any, any],
  ...infer B extends [any, any][]
]
  ? T extends A[0]
    ? A[1]
    : UnionInType<T, B>
  : T;


type UnionReplace<T, U extends [any, any][]> = T extends T
  ? UnionInType<T, U>
  : never;
```
