# 第一个元素

<BtnGroup 
  issue="https://tsch.js.org/14/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31855"
/>

> 题目

实现一个`First<T>`泛型，它接受一个数组`T`并返回它的第一个元素的类型。

例如：

```ts
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // 应推导出 'a'
type head2 = First<arr2>; // 应推导出 3
```

> 解答

```ts
type First<T extends any[]> = T extends [] ? never : T[0];
```

> 精选

> ```ts
> //answer1
> type First<T extends any[]> = T extends [] ? never : T[0];
>
> //answer2
> type First<T extends any[]> = T["length"] extends 0 ? never : T[0];
>
> //answer3
> type First<T extends any[]> = T extends [infer A, ...infer rest] ? A : never;
> ```

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/16315"
/>
