/*
  847 - String Join
  -------
  by Matt Davis (@tl-matt-davis) #困难

  ### 题目

  Create a type-safe string join utility which can be used like so:

  ```ts
  const hyphenJoiner = join('-')
  const result = hyphenJoiner('a', 'b', 'c'); // = 'a-b-c'
  ```

  Or alternatively:
  ```ts
  join('#')('a', 'b', 'c') // = 'a#b#c'
  ```

  When we pass an empty delimiter (i.e '') to join, we should concat the strings as they are, i.e:
  ```ts
  join('')('a', 'b', 'c') // = 'abc'
  ```

  When only one item is passed, we should get back the original item (without any delimiter added):
  ```ts
  join('-')('a') // = 'a'
  ```

  > 在 Github 上查看：https://tsch.js.org/847/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Tuple = readonly string[];

/**
 * Tail<['1', '2', '3']> = ['2', '3'].
 */
type Tail<T extends Tuple> = T extends readonly [infer _, ...infer Rest]
  ? Rest
  : [];

/**
 * Join<['1', '2'], " - "> = '1 - 2'.
 * Join<['1'], " - "> = '1'.
 * Join<[], 'x'> = ''.
 */
type Join<T extends Tuple, Separator extends string> = T extends readonly []
  ? ""
  : T extends readonly [infer Head]
  ? Head
  : `${T[0]}${Separator}${Join<Tail<T>, Separator>}`;

declare function join<D extends string>(
  delimiter: D
): <P extends Tuple>(...parts: P) => Join<P, D>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

// Edge cases
const noCharsOutput = join("-")();
const oneCharOutput = join("-")("a");
const noDelimiterOutput = join("")("a", "b", "c");

// Regular cases
const hyphenOutput = join("-")("a", "b", "c");
const hashOutput = join("#")("a", "b", "c");
const twoCharOutput = join("-")("a", "b");
const longOutput = join("-")("a", "b", "c", "d", "e", "f", "g", "h");

type cases = [
  Expect<Equal<typeof noCharsOutput, "">>,
  Expect<Equal<typeof oneCharOutput, "a">>,
  Expect<Equal<typeof noDelimiterOutput, "abc">>,
  Expect<Equal<typeof twoCharOutput, "a-b">>,
  Expect<Equal<typeof hyphenOutput, "a-b-c">>,
  Expect<Equal<typeof hashOutput, "a#b#c">>,
  Expect<Equal<typeof longOutput, "a-b-c-d-e-f-g-h">>
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/847/answer/zh-CN
  > 查看解答：https://tsch.js.org/847/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
