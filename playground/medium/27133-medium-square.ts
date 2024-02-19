/*
  27133 - Square
  -------
  by null (@aswinsvijay) #中等 #tuple #array #math

  ### 题目

  Given a number, your type should return its square.

  > 在 Github 上查看：https://tsch.js.org/27133/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Abs<N extends number> = `${N}` extends `-${infer R extends number}`
  ? R
  : N;
type SplitZeroes<
  N extends number,
  Z extends string = ""
> = `${N}` extends `${infer N extends number}0`
  ? SplitZeroes<N, `${Z}00`>
  : [N, Z];
type SquareTuple<
  N extends number,
  A extends any[] = [],
  Acc extends any[] = []
> = A["length"] extends N
  ? [...A, ...Acc]
  : SquareTuple<N, [1, ...A], [...A, ...A, ...Acc]>;

type Square<
  _N extends number,
  N extends [number, string] = SplitZeroes<_N>,
  U extends any[] = SquareTuple<Abs<N[0]>>
> = `${U["length"]}${N[1]}` extends `${infer N extends number}` ? N : never;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<100>, 10000>>,

  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<-50>, 2500>>
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/27133/answer/zh-CN
  > 查看解答：https://tsch.js.org/27133/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
