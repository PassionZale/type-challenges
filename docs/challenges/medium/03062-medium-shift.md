# Shift

<BtnGroup 
	issue="https://tsch.js.org/3062/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32077"
/>

> 题目

Implement the type version of `Array.shift`

For example

```typescript
type Result = Shift<[3, 2, 1]>; // [2, 1]
```

> 解答

```ts
type Shift<T extends unknown[]> = T extends [infer _, ...infer Rest]
  ? [...Rest]
  : T;
```
