/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #中等 #template-literal

  ### 题目

  计算字符串的长度，类似于 `String#length` 。

  > 在 Github 上查看：https://tsch.js.org/298/zh-CN
*/

/* _____________ 你的代码 _____________ */

namespace t00298 {
  // 原始类型
  type S = "kumiko";

  // 字符串转换为数据
  type StringToArray<S extends string> = S extends `${infer First}${infer Rest}`
    ? [First, ...StringToArray<Rest>]
    : [];

  // type S1 = ["k", "u", "m", "i", "k", "o"]
  type S1 = StringToArray<S>;

  // 通过数组的 length 属性获取长度
  // type S2 = 6
  type S2 = S1["length"];

  export type LengthOfString<T extends string> = StringToArray<T>["length"];
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<t00298.LengthOfString<"">, 0>>,
  Expect<Equal<t00298.LengthOfString<"kumiko">, 6>>,
  Expect<Equal<t00298.LengthOfString<"reina">, 5>>,
  Expect<Equal<t00298.LengthOfString<"Sound! Euphonium">, 16>>
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/298/answer/zh-CN
  > 查看解答：https://tsch.js.org/298/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
