# CamelCase

<BtnGroup 
	issue="https://tsch.js.org/114/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/25014"
/>

> 题目

实现 `CamelCase<T>` ，将 `snake_case` 类型的表示的字符串转换为 `camelCase` 的表示方式。

例如

```ts
type camelCase1 = CamelCase<"hello_world_with_types">; // 预期为 'helloWorldWithTypes'
type camelCase2 = CamelCase<"HELLO_WORLD_WITH_TYPES">; // 期望与前一个相同
```

> 解答

```ts
type IsAlphabet<T extends string> = Lowercase<T> extends Uppercase<T>
  ? false
  : true;

type CamelCase<
  S extends string,
  Result extends string = ""
> = S extends `${infer Left}${infer Rest}`
  ? IsAlphabet<Left> extends true
    ? Result extends `${infer Prefix}_`
      ? CamelCase<Rest, `${Prefix}${Uppercase<Left>}`>
      : CamelCase<Rest, `${Result}${Lowercase<Left>}`>
    : CamelCase<Rest, `${Result}${Left}`>
  : Result;
```
