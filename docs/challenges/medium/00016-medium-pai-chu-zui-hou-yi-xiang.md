# 排除最后一项

<BtnGroup
  issue="https://tsch.js.org/16/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31922"
/>

> 题目

在此挑战中建议使用TypeScript 4.0

实现一个泛型`Pop<T>`，它接受一个数组`T`，并返回一个由数组`T`的前 N-1 项（N 为数组`T`的长度）以相同的顺序组成的数组。

例如

```ts
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]
type arr3 = []

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]
type re2 = Pop<arr3> // expected to be []
```

> 解答

```ts
type Pop<T extends unknown[]> = T extends [...infer R, infer _] ? R : T
```
