# IsRequiredKey

<BtnGroup 
	issue="https://tsch.js.org/2857/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/3315"
/>

> 题目

Implement a generic `IsRequiredKey<T, K>` that return whether `K` are required keys of `T` .

For example

```typescript
type A = IsRequiredKey<{ a: number; b?: string }, "a">; // true
type B = IsRequiredKey<{ a: number; b?: string }, "b">; // false
type C = IsRequiredKey<{ a: number; b?: string }, "b" | "a">; // false
```

> 解答

```ts
type IsRequiredKey<T, K extends keyof T> = T extends Record<K, T[K]>
  ? true
  : false;
```
