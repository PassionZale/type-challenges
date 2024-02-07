# Tuple to Nested Object

<BtnGroup 
	issue="https://tsch.js.org/3188/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32079"
/>

> 题目

Given a tuple type `T` that only contains string type, and a type `U`, build an object recursively.

```typescript
type a = TupleToNestedObject<["a"], string>; // {a: string}
type b = TupleToNestedObject<["a", "b"], number>; // {a: {b: number}}
type c = TupleToNestedObject<[], boolean>; // boolean. if the tuple is empty, just return the U type
```

> 解答

```ts
type TupleToNestedObject<T, U> = T extends [infer First, ...infer Rest]
  ? {
      [K in First extends string ? First : never]: TupleToNestedObject<Rest, U>;
    }
  : U;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/3282"
/>

`[K in First extends string ? First : never]`

可以简写为

`[K in First & string]`

```ts
type TupleToNestedObject<T, U> = T extends [infer F, ...infer R]
  ? {
      [K in F & string]: TupleToNestedObject<R, U>;
    }
  : U;
```
