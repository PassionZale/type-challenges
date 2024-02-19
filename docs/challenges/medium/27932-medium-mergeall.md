# MergeAll

<BtnGroup 
	issue="https://tsch.js.org/27932/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32289"
/>

> 题目

Merge variadic number of types into a new type. If the keys overlap, its values should be merged into an union.

For example:

```ts
type Foo = { a: 1; b: 2 };
type Bar = { a: 2 };
type Baz = { c: 3 };

type Result = MergeAll<[Foo, Bar, Baz]>; // expected to be { a: 1 | 2; b: 2; c: 3 }
```

> 解答

递归遍历，进行合并，用一个空对象收集所有的结果

```ts
type MergeAll<XS, P = {}> = XS extends [infer F, ...infer Rest]
  ? MergeAll<Rest, Merge<P, F>>
  : P;

type Merge<F, S> = {
  [P in keyof F | keyof S]: P extends keyof S
    ? P extends keyof F
      ? S[P] | F[P]
      : S[P]
    : P extends keyof F
    ? F[P]
    : never;
};
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/29394"
/>

> ```ts
> type MergeAll<
>   XS extends object[],
>   U = XS[number],
>   Keys extends PropertyKey = U extends U ? keyof U : never
> > = {
>   [K in Keys]: U extends U ? U[K & keyof U] : never;
> };
> ```
