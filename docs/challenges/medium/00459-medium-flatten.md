# Flatten

<BtnGroup 
  issue="https://tsch.js.org/459/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31958"
/>

> 题目

在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。

例如:

```ts
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
```

> 解答

```ts
namespace t00459 {
  type Uni = [1, 2, [3, 4], [[[5]]]];

  // T extends [infer First, ...infer Rest]
  // 判断 T 是一个数组，并通过 infer + 解构 提取每个 arrayItem
  // 使用 infer + 解构将每个数组 item 进行递归推导
  type S1<T> = T extends [infer First, ...infer Rest]
    ? [...S1<First>, ...S1<Rest>]
    : [T];

  // type S2 = [1, 2, 3, 4, [], 5, [], [], [], []]
  type S2 = S1<Uni>;

  // 去除空数组
  type S3<T> = T extends [infer First, ...infer Rest]
    ? [...S3<First>, ...S3<Rest>]
    : T extends []
    ? []
    : [T];

  // type S4 = [1, 2, 3, 4, 5]
  type S4 = S3<Uni>;

  // 需要限制泛型为数组
  export type S5<T extends unknown[]> = T extends [infer First, ...infer Rest]
    ? First extends unknown[]
      ? [...S5<First>, ...S5<Rest>]
      : [First, ...S5<Rest>]
    : T extends []
    ? []
    : [T];
}

type Flatten<T extends unknown[]> = t00459.S5<T>;
```
