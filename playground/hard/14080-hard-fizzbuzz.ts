/*
  14080 - FizzBuzz
  -------
  by Lee Crosby (@Cygnut) #困难 #array #math #infer

  ### 题目

  The FizzBuzz problem is a classic test given in coding interviews. The task is simple:

  Print integers 1 to N, except:

  - Print "Fizz" if an integer is divisible by 3;
  - Print "Buzz" if an integer is divisible by 5;
  - Print "FizzBuzz" if an integer is divisible by both 3 and 5.

  For example, for N = 20, the output should be:
  `1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, 16, 17, Fizz, 19, Buzz`

  In the challenge below, we will want to generate this as an array of string literals.

  For large values of N, you will need to ensure that any types generated do so efficiently (e.g. by
  correctly using the tail-call optimisation for recursion).

  > 在 Github 上查看：https://tsch.js.org/14080/zh-CN
*/

/* _____________ 你的代码 _____________ */

type FizzBuzzOne<
  C extends number,
  C3 extends number,
  C5 extends number,
  _FB = `${C3 extends 3 ? "Fizz" : ""}${C5 extends 5 ? "Buzz" : ""}`
> = _FB extends "" ? `${C}` : _FB;

type FizzBuzz<
  N extends number,
  _R extends string[] = [],
  _CT extends unknown[] = [unknown],
  _C3T extends unknown[] = [unknown],
  _C5T extends unknown[] = [unknown]
> = _R["length"] extends N
  ? _R
  : FizzBuzz<
      N,
      [..._R, FizzBuzzOne<_CT["length"], _C3T["length"], _C5T["length"]>],
      [..._CT, unknown],
      _C3T["length"] extends 3 ? [unknown] : [..._C3T, unknown],
      _C5T["length"] extends 5 ? [unknown] : [..._C5T, unknown]
    >;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<FizzBuzz<1>, ["1"]>>,
  Expect<Equal<FizzBuzz<5>, ["1", "2", "Fizz", "4", "Buzz"]>>,
  Expect<
    Equal<
      FizzBuzz<20>,
      [
        "1",
        "2",
        "Fizz",
        "4",
        "Buzz",
        "Fizz",
        "7",
        "8",
        "Fizz",
        "Buzz",
        "11",
        "Fizz",
        "13",
        "14",
        "FizzBuzz",
        "16",
        "17",
        "Fizz",
        "19",
        "Buzz"
      ]
    >
  >,
  Expect<
    Equal<
      FizzBuzz<100>,
      [
        "1",
        "2",
        "Fizz",
        "4",
        "Buzz",
        "Fizz",
        "7",
        "8",
        "Fizz",
        "Buzz",
        "11",
        "Fizz",
        "13",
        "14",
        "FizzBuzz",
        "16",
        "17",
        "Fizz",
        "19",
        "Buzz",
        "Fizz",
        "22",
        "23",
        "Fizz",
        "Buzz",
        "26",
        "Fizz",
        "28",
        "29",
        "FizzBuzz",
        "31",
        "32",
        "Fizz",
        "34",
        "Buzz",
        "Fizz",
        "37",
        "38",
        "Fizz",
        "Buzz",
        "41",
        "Fizz",
        "43",
        "44",
        "FizzBuzz",
        "46",
        "47",
        "Fizz",
        "49",
        "Buzz",
        "Fizz",
        "52",
        "53",
        "Fizz",
        "Buzz",
        "56",
        "Fizz",
        "58",
        "59",
        "FizzBuzz",
        "61",
        "62",
        "Fizz",
        "64",
        "Buzz",
        "Fizz",
        "67",
        "68",
        "Fizz",
        "Buzz",
        "71",
        "Fizz",
        "73",
        "74",
        "FizzBuzz",
        "76",
        "77",
        "Fizz",
        "79",
        "Buzz",
        "Fizz",
        "82",
        "83",
        "Fizz",
        "Buzz",
        "86",
        "Fizz",
        "88",
        "89",
        "FizzBuzz",
        "91",
        "92",
        "Fizz",
        "94",
        "Buzz",
        "Fizz",
        "97",
        "98",
        "Fizz",
        "Buzz"
      ]
    >
  >
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/14080/answer/zh-CN
  > 查看解答：https://tsch.js.org/14080/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
