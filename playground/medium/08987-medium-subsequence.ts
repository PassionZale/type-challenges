/*
  8987 - Subsequence
  -------
  by jiangshan (@jiangshanmeta) #中等 #union

  ### 题目

  Given an array of unique elements, return all possible subsequences.

  A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.

  For example:

  ```typescript
  type A = Subsequence<[1, 2]> // [] | [1] | [2] | [1, 2]
  ```

  > 在 Github 上查看：https://tsch.js.org/8987/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Subsequence<T extends any[]> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] >>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/8987/answer/zh-CN
  > 查看解答：https://tsch.js.org/8987/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
