/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #中等 #array

  ### 题目

  在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。

  例如:

  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```

  > 在 Github 上查看：https://tsch.js.org/459/zh-CN
*/

/* _____________ 你的代码 _____________ */

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

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>,
      [{ foo: "bar"; 2: 10 }, "foobar"]
    >
  >
];

// @ts-expect-error
type error = Flatten<"1">;

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/459/answer/zh-CN
  > 查看解答：https://tsch.js.org/459/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
