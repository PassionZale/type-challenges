# String to Number

<BtnGroup 
	issue="https://tsch.js.org/300/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/17355"
/>

> 题目

Convert a string literal to a number, which behaves like `Number.parseInt`.

> 解答

```ts
type ToNumber<S extends string> = S extends `${infer N extends number}`
  ? N
  : never;
```