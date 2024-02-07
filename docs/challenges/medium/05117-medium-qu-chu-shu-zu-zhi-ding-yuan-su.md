# 去除数组指定元素

<BtnGroup 
	issue="https://tsch.js.org/5117/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32097"
/>

> 题目

实现一个像 Lodash.without 函数一样的泛型 Without<T, U>，它接收数组类型的 T 和数字或数组类型的 U 为参数，会返回一个去除 U 中元素的数组 T。

例如：

```ts
type Res = Without<[1, 2], 1>; // expected to be [2]
type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
```

> 解答

由于给定泛型 `U` 类型不一，因此将其转换为联合类型，统一类型，

再递归泛型 `T` 判断每一个元素是否在联合类型中，例如：

```ts
type InUnion<T> = T extends 1 | 2 | 3 ? true : false

// type A = true
type A = InUnion<1>

// type B = false
type B = InUnion<10>
```

合并答案：

```ts
type ToUnion<T> = T extends unknown[] ? T[number] : T;

type Without<T extends unknown[], U> = T extends [infer F, ...infer R]
  ? F extends ToUnion<U>
    ? Without<R, U>
    : [F, ...Without<R, U>]
  : T;
```
