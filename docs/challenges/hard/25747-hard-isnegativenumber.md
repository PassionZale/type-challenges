# IsNegativeNumber

<BtnGroup 
	issue="https://tsch.js.org/25747/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/26048"
/>

> 题目

Sometimes when working with numeric literals, we need to rule out (or enforce) that the provided number is a positive integer.

To do that, we first need a way to tell if the number is negative.

Write a type-level function `IsNegativeNumber` that accepts a number `N` and returns:

- `true` if `N` is negative
- `false` if `N` is positive
- `false` if `N` is `0`,
- `never` if `N` is `number`
- `never` if `N` is a union

> 解答

```ts
type IsUnion<T, U = T> = U extends T ? ([T] extends [U] ? false : true) : never;

type IsNegativeNumber<T extends number> = IsUnion<T> extends true
  ? never //union
  : number extends T
  ? never //number
  : `${T}` extends `-${number}`
  ? true
  : false; //negative number
```
