# SnakeCase

<BtnGroup 
	issue="https://tsch.js.org/19458/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/20928"
/>

> 题目

Create a `SnakeCase<T>` generic that turns a string formatted in **camelCase** into a string formatted in **snake_case**.

A few examples:

```ts
type res1 = SnakeCase<"hello">; // => "hello"
type res2 = SnakeCase<"userName">; // => "user_name"
type res3 = SnakeCase<"getElementById">; // => "get_element_by_id"
```

> 解答

```ts
type SnakeCase<T> = T extends `${infer A}${infer R}`
  ? Uppercase<A> extends A
    ? `_${Lowercase<A>}${SnakeCase<R>}`
    : `${A}${SnakeCase<R>}`
  : "";
```
