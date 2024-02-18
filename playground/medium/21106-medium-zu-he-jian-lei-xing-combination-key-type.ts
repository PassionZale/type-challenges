/*
  21106 - 组合键类型 Combination key type
  -------
  by Nauxscript (@Nauxscript) #中等

  ### 题目

  1. 把多个修饰键两两组合，但不可以出现相同的修饰键组合。
  2. 提供的 `ModifierKeys` 中，前面的值比后面的值高，即 `cmd ctrl` 是可以的，但 `ctrl cmd` 是不允许的。

  > 在 Github 上查看：https://tsch.js.org/21106/zh-CN
*/

/* _____________ 你的代码 _____________ */

// never会被联合类型过滤，所以U的默认值给到never
type Combs<T extends string[], U = never> = T extends [
  infer F extends string,
  ...infer R extends string[]
]
  ? // 当遍历到最后一个元素时，R为空数组，空数组[number]为never
    // 此时`${F} ${R[number]}`为`${最后一个元素类型} ${never}`，与never组成模板字符串类型时会返回never
    Combs<R, U | `${F} ${R[number]}`>
  : U;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type ModifierKeys = ["cmd", "ctrl", "opt", "fn"];
type CaseTypeOne =
  | "cmd ctrl"
  | "cmd opt"
  | "cmd fn"
  | "ctrl opt"
  | "ctrl fn"
  | "opt fn";

type cases = [Expect<Equal<Combs<ModifierKeys>, CaseTypeOne>>];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/21106/answer/zh-CN
  > 查看解答：https://tsch.js.org/21106/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
