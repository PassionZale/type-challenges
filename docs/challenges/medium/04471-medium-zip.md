# Zip

<BtnGroup 
	issue="https://tsch.js.org/4471/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32092"
/>

> 题目

In This Challenge, You should implement a type `Zip<T, U>`, T and U must be `Tuple`

```ts
type exp = Zip<[1, 2], [true, false]>; // expected to be [[1, true], [2, false]]
```

> 解答

递归处理给定的两个元组类型：

每次提取 `T[0]` 和 `U[0]`，组合成 `[T[0], U[0]]`，

并将剩余的 `item` 继续递归，最终再返回为元组：`[[T[0], U[0]], ...Zip<TRest, URest>]`，

递归期间，

若 `T` 为 `[]`，则返回 `[]`，

若 `U` 为 `[]`，则返回 `[]`。

```ts
type Zip<T extends unknown[], U extends unknown[]> = T extends [
  infer A,
  ...infer B
]
  ? U extends [infer M, ...infer N]
    ? [[A, M], ...Zip<B, N>]
    : []
  : [];
```
