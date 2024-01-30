# 最后一个元素

<BtnGroup
  issue="https://tsch.js.org/15/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31921"
/>

> 题目

在此挑战中建议使用TypeScript 4.0

实现一个`Last<T>`泛型，它接受一个数组`T`并返回其最后一个元素的类型。

例如

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // 应推导出 'c'
type tail2 = Last<arr2> // 应推导出 1
```

> 解答

通过 `解构` 和 `infer` 来提取数组最后一项：`[...infer _, infer R]`

若有则返回最后项的推导类型 `R`，反之则返回 `never`。

```ts
type Last<T extends unknown[]> = T extends [...infer _, infer R] ? R : never
```
