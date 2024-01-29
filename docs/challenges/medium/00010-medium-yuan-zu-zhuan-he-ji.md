# 元组转合集

<BtnGroup 
  issue="https://tsch.js.org/10/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31914"
/>

> 题目

实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。

例如

```ts
type Arr = ["1", "2", "3"];

type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'
```

> 解答

```ts
type TupleToUnion<T extends unknown[]> = T[number];
```

或者使用 `infer` 来进行推导：

```ts
type TupleToUnion<T> = T extends (infer R)[] ? R : never;
```
