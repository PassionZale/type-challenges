/*
  14188 - Run-length encoding
  -------
  by Hen Hedymdeith (@alfaproxima) #困难

  ### 题目

  Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
  Also make a decoder for that string.

  > 在 Github 上查看：https://tsch.js.org/14188/zh-CN
*/

/* _____________ 你的代码 _____________ */

namespace RLE {
  type EncodeHelper<
    S extends string,
    P extends string = "",
    L extends 1[] = []
  > = S extends `${infer F}${infer R}`
    ? F extends P
      ? EncodeHelper<R, P, [1, ...L]>
      : P extends ""
      ? EncodeHelper<R, F, [1]>
      : L["length"] extends 1
      ? `${P}${EncodeHelper<R, F, [1]>}`
      : `${L["length"]}${P}${EncodeHelper<R, F, [1]>}`
    : P extends ""
    ? ""
    : L["length"] extends 1
    ? P
    : `${L["length"]}${P}`;
  export type Encode<S extends string> = EncodeHelper<S>;

  type DecodeHelper<
    S extends string,
    L extends string = ""
  > = S extends `${infer F}${infer R}`
    ? F extends `${number}`
      ? DecodeHelper<R, `${L}${F}`>
      : `${Repeat<F, L extends "" ? "1" : L>}${DecodeHelper<R, "">}`
    : "";
  type Repeat<
    S extends string,
    L extends string,
    C extends 1[] = []
  > = `${C["length"]}` extends L ? "" : `${S}${Repeat<S, L, [1, ...C]>}`;
  export type Decode<S extends string> = DecodeHelper<S>;
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<"AAABCCXXXXXXY">, "3AB2C6XY">>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<"3AB2C6XY">, "AAABCCXXXXXXY">>
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/14188/answer/zh-CN
  > 查看解答：https://tsch.js.org/14188/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
