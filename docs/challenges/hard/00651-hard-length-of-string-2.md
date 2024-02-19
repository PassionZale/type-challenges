# Length of String 2

<BtnGroup 
	issue="https://tsch.js.org/651/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/25349"
/>

> 题目

Implement a type `LengthOfString<S>` that calculates the length of the template string (as in [298 - Length of String](https://tsch.js.org/298)):

```ts
type T0 = LengthOfString<"foo">; // 3
```

The type must support strings several hundred characters long (the usual recursive calculation of the string length is limited by the depth of recursive function calls in TS, that is, it supports strings up to about 45 characters long).

> 解答

```ts
type LengthOfString<
  T extends string,
  Acc extends string[] = []
> = T extends `${string}${infer T}`
  ? LengthOfString<T, [string, ...Acc]>
  : Acc["length"];
```
