# Trunc

<BtnGroup 
	issue="https://tsch.js.org/5140/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32098"
/>

> 题目

Implement the type version of `Math.trunc`, which takes string or number and returns the integer part of a number by removing any fractional digits.

For example:

```typescript
type A = Trunc<12.34>; // 12
```

> 解答

可以使用模板字符来进行推断： `` `${T}` extends `${infer L}.${infer _}` ``。

这里需要注意 `".3"` 进行推断时，`L` 会推断成 `""`。

```ts
type Trunc<T extends string | number> = `${T}` extends `${infer L}.${infer _}`
  ? L extends ""
    ? "0"
    : L
  : `${T}`;
```
