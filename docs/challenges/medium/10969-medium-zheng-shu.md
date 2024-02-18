# 整数

<BtnGroup 
	issue="https://tsch.js.org/10969/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32269"
/>

> 题目

请完成类型 `Integer<T>`，类型 `T` 继承于 `number`，如果 `T` 是一个整数则返回它，否则返回 `never`。

> 解答

```ts
type Integer<T extends string | number> = number extends T
  ? never
  : `${T}` extends `${string}.${string}`
  ? never
  : T;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/18773"
/>

除了使用模板字符硬解以外，还可以使用 `bigint` 特性：

```ts
type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never;
```
