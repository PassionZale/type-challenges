/*
  274 - Integers Comparator
  -------
  by Pig Fang (@g-plane) #地狱 #template-literal #math

  ### 题目

  Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:

  - If `a` is greater than `b`, type should be `Comparison.Greater`.
  - If `a` and `b` are equal, type should be `Comparison.Equal`.
  - If `a` is lower than `b`, type should be `Comparison.Lower`.

  **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**

  > 在 Github 上查看：https://tsch.js.org/274/zh-CN
*/

/* _____________ 你的代码 _____________ */

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type Comparator<
  A extends number | string,
  B extends number | string
> = `${A}` extends `-${infer AbsA}`
  ? `${B}` extends `-${infer AbsB}`
    ? ComparePositives<AbsB, AbsA>
    : Comparison.Lower
  : `${B}` extends `-${number}`
  ? Comparison.Greater
  : ComparePositives<`${A}`, `${B}`>;

// Compares two positive long numbers
type ComparePositives<
  A extends string,
  B extends string,
  ByLength = CompareByLength<A, B>
> = ByLength extends Comparison.Equal ? CompareByDigits<A, B> : ByLength;

// Compares two strings by length
type CompareByLength<
  A extends string,
  B extends string
> = A extends `${infer _}${infer AR}`
  ? B extends `${infer _}${infer BR}`
    ? CompareByLength<AR, BR>
    : Comparison.Greater
  : B extends `${infer _}${infer _}`
  ? Comparison.Lower
  : Comparison.Equal;

// Compares two positive long numbers of the same length
type CompareByDigits<
  A extends string,
  B extends string
> = `${A}|${B}` extends `${infer AF}${infer AR}|${infer BF}${infer BR}`
  ? CompareDigits<AF, BF> extends Comparison.Equal
    ? CompareByDigits<AR, BR>
    : CompareDigits<AF, BF>
  : Comparison.Equal;

// Compares two digits
type CompareDigits<A extends string, B extends string> = A extends B
  ? Comparison.Equal
  : "0123456789" extends `${string}${A}${string}${B}${string}`
  ? Comparison.Lower
  : Comparison.Greater;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<
    Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>
  >,
  Expect<
    Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>
  >,
  Expect<
    Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>
  >,
  Expect<
    Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>
  >,
  Expect<
    Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>
  >,
  Expect<
    Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>
  >
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/274/answer/zh-CN
  > 查看解答：https://tsch.js.org/274/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
