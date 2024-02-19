# IsPalindrome

<BtnGroup 
	issue="https://tsch.js.org/4037/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/4040"
/>

> 题目

Implement type `IsPalindrome<T>` to check whether a string or number is palindrome.

For example:

```typescript
IsPalindrome<"abc">; // false
IsPalindrome<121>; // true
```

> 解答

```ts
type StringToTuple<T extends string> = T extends `${infer F}${infer R}`
  ? [F, ...StringToTuple<R>]
  : [];

type IsIsPalindromeArray<T extends any[]> = T extends [
  infer F,
  ...infer M,
  infer L
]
  ? F extends L
    ? IsIsPalindromeArray<M>
    : false
  : true;

type IsPalindrome<T extends string | number> = IsIsPalindromeArray<
  StringToTuple<`${T}`>
>;
```
