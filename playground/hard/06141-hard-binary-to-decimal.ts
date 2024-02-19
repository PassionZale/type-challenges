/*
  6141 - Binary to Decimal
  -------
  by wotsushi (@wotsushi) #困难 #math

  ### 题目

  Implement `BinaryToDecimal<S>` which takes an exact string type `S` consisting 0 and 1 and returns an exact number type corresponding with `S` when `S` is regarded as a binary.
  You can assume that the length of `S` is equal to or less than 8 and `S` is not empty.

  ```ts
  type Res1 = BinaryToDecimal<'10'>; // expected to be 2
  type Res2 = BinaryToDecimal<'0011'>; // expected to be 3
  ```

  > 在 Github 上查看：https://tsch.js.org/6141/zh-CN
*/

/* _____________ 你的代码 _____________ */

// step1: 将字符串转换为tuple ，为了能够使用 ... 操作符控制 infer 的位置
type StringToTuple<S extends string> = S extends `${infer F}${infer R}`
  ? [F, ...StringToTuple<R>]
  : [];

// 用 res 存储最终的计算结果， arr 存储 1，2，4，8，16，遇到1，则将 Arr 长度加入 res
type Convert<
  T extends string[],
  Arr extends number[] = [1],
  Res extends number[] = []
> = T extends [...infer F extends string[], infer L]
  ? L extends "1"
    ? Convert<F, [...Arr, ...Arr], [...Res, ...Arr]>
    : Convert<F, [...Arr, ...Arr], Res>
  : Res["length"];

type BinaryToDecimal<S extends string> = Convert<StringToTuple<S>>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<BinaryToDecimal<"10">, 2>>,
  Expect<Equal<BinaryToDecimal<"0011">, 3>>,
  Expect<Equal<BinaryToDecimal<"00000000">, 0>>,
  Expect<Equal<BinaryToDecimal<"11111111">, 255>>,
  Expect<Equal<BinaryToDecimal<"10101010">, 170>>
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/6141/answer/zh-CN
  > 查看解答：https://tsch.js.org/6141/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
