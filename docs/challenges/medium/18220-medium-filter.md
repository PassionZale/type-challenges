# Filter

<BtnGroup 
	issue="https://tsch.js.org/18220/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32275"
/>

> 题目

Implement the type `Filter<T, Predicate>` takes an Array `T`, primitive type or union primitive type `Predicate` and returns an Array include the elements of `Predicate`.

> 解答

```ts
type Filter<T extends any[], P> = T extends [infer A, ...infer rest]
  ? [...(A extends P ? [A] : []), ...Filter<rest, P>]
  : [];
```
