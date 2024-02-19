# Drop String

<BtnGroup 
	issue="https://tsch.js.org/2059/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/4911"
/>

> 题目

Drop the specified chars from a string.

For example:

```ts
type Butterfly = DropString<"foobar!", "fb">; // 'ooar!'
```

> 解答

```ts
type DropString<S, R> = S extends `${infer x}${infer xs}`
  ? R extends `${any}${x}${any}`
    ? DropString<xs, R>
    : `${x}${DropString<xs, R>}`
  : "";
```
