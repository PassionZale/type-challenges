# Capitalize Words

<BtnGroup 
	issue="https://tsch.js.org/112/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/19571"
/>

> 题目

实现`CapitalizeWords<T>`，它将**字符串的每个单词**的第一个字母转换为大写，其余部分保持原样。

例如

```ts
type capitalized = CapitalizeWords<"hello world, my friends">; // 预期为 'Hello World, My Friends'
```

> 解答

```ts
type CapitalizeWords<
  S extends string,
  W extends string = ''
> = S extends `${infer A}${infer B}`
  ? Uppercase<A> extends Lowercase<A>
    ? `${Capitalize<`${W}${A}`>}${CapitalizeWords<B>}`
    : CapitalizeWords<B, `${W}${A}`>
  : Capitalize<W>
```
