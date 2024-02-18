# Parse URL Params

<BtnGroup 
	issue="https://tsch.js.org/9616/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32263"
/>

> 题目

You're required to implement a type-level parser to parse URL params string into an Union.

```ts
ParseUrlParams<":id">; // id
ParseUrlParams<"posts/:id">; // id
ParseUrlParams<"posts/:id/:user">; // id | user
```

> 解答

```ts
type ParseUrlParams<T extends string> = T extends `${string}:${infer R}`
  ? R extends `${infer F}/${infer L}`
    ? F | ParseUrlParams<L>
    : R
  : never;
```
