# CheckRepeatedChars

<BtnGroup 
	issue="https://tsch.js.org/9142/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32261"
/>

> 题目

判断一个 string 类型中是否有相同的字符

```ts
type CheckRepeatedChars<'abc'>   // false
type CheckRepeatedChars<'aba'>   // true
```

> 解答

```ts
type CheckRepeatedChars<T extends string> = T extends `${infer F}${infer E}`
  ? E extends `${string}${F}${string}`
    ? true
    : CheckRepeatedChars<E>
  : false;
```
