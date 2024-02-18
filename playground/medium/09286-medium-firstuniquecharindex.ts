/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #中等 #string

  ### 题目

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > 在 Github 上查看：https://tsch.js.org/9286/zh-CN
*/

/* _____________ 你的代码 _____________ */

type FirstUniqueCharIndex<
  T extends string,
  U extends string[] = []
> = T extends `${infer F}${infer R}`
  ? // 判断F 在不在 U中存在相同的
    F extends U[number]
    ? // 如果在就把F添加进去，此时也相当于索引+1了
      FirstUniqueCharIndex<R, [...U, F]>
    : // 如果不在，继续判断F在不在R中存在
    R extends `${string}${F}${string}`
    ? FirstUniqueCharIndex<R, [...U, F]>
    : // 双重判断后都不在，就可以返回索引了
      U["length"]
  : -1;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<FirstUniqueCharIndex<"leetcode">, 0>>,
  Expect<Equal<FirstUniqueCharIndex<"loveleetcode">, 2>>,
  Expect<Equal<FirstUniqueCharIndex<"aabb">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"aaa">, -1>>
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/9286/answer/zh-CN
  > 查看解答：https://tsch.js.org/9286/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
