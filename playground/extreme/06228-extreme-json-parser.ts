/*
  6228 - JSON Parser
  -------
  by Hydration (@hydrati) #地狱 #template-literal #json

  ### 题目

  You're required to implement a type-level partly parser to parse JSON string into a object literal type.

  Requirements:
   - `Numbers` and `Unicode escape (\uxxxx)` in JSON can be ignored. You needn't to parse them.

  > 在 Github 上查看：https://tsch.js.org/6228/zh-CN
*/

/* _____________ 你的代码 _____________ */

//My answer is only for the test cases
type Parse<T extends string> = Eval<T> extends [infer V, infer U] ? V : never;

type Eval<T> = T extends `${" " | "\n"}${infer U}`
  ? Eval<U>
  : T extends `true${infer U}`
  ? [true, U]
  : T extends `false${infer U}`
  ? [false, U]
  : T extends `null${infer U}`
  ? [null, U]
  : T extends `"${infer U}`
  ? EvalString<U>
  : T extends `${"["}${infer U}`
  ? EvalArray<U>
  : T extends `${"{"}${infer U}`
  ? EvalObject<U>
  : false;

type Escapes = { r: "\r"; n: "\n"; b: "\b"; f: "\f" };

type EvalString<T, S extends string = ""> = T extends `"${infer U}`
  ? [S, U]
  : (
      T extends `\\${infer C}${infer U}`
        ? C extends keyof Escapes
          ? [C, U]
          : false
        : false
    ) extends [infer C, infer U]
  ? EvalString<U, `${S}${C extends keyof Escapes ? Escapes[C] : never}`>
  : T extends `${infer C}${infer U}`
  ? EvalString<U, `${S}${C}`>
  : false;

type EvalArray<T, A extends any[] = []> = T extends `${" " | "\n"}${infer U}`
  ? EvalArray<U, A>
  : T extends `]${infer U}`
  ? [A, U]
  : T extends `,${infer U}`
  ? EvalArray<U, A>
  : Eval<T> extends [infer V, infer U]
  ? EvalArray<U, [...A, V]>
  : false;

type EvalObject<T, K extends string = "", O = {}> = T extends `${
  | " "
  | "\n"}${infer U}`
  ? EvalObject<U, K, O>
  : T extends `}${infer U}`
  ? [O, U]
  : T extends `,${infer U}`
  ? EvalObject<U, K, O>
  : T extends `"${infer U}`
  ? Eval<`"${U}`> extends [`${infer KK}`, infer UU]
    ? EvalObject<UU, KK, O>
    : false
  : T extends `:${infer U}`
  ? Eval<U> extends [infer V, infer UU]
    ? EvalObject<UU, "", Merge<{ [P in K]: V } & O>>
    : false
  : false;

type Merge<T> = { [P in keyof T]: T[P] };

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<
    Equal<
      Parse<`
      {
        "a": "b", 
        "b": false, 
        "c": [true, false, "hello", {
          "a": "b", 
          "b": false
        }], 
        "nil": null
      }
    `>,
      {
        nil: null;
        c: [
          true,
          false,
          "hello",
          {
            a: "b";
            b: false;
          }
        ];
        b: false;
        a: "b";
      }
    >
  >,
  Expect<Equal<Parse<"{}">, {}>>,

  Expect<Equal<Parse<"[]">, []>>,

  Expect<Equal<Parse<"[1]">, never>>,

  Expect<Equal<Parse<"true">, true>>,

  Expect<
    Equal<Parse<'["Hello", true, false, null]'>, ["Hello", true, false, null]>
  >,

  Expect<
    Equal<
      Parse<`
      {
        "hello\\r\\n\\b\\f": "world"
      }`>,
      {
        "hello\r\n\b\f": "world";
      }
    >
  >,

  Expect<Equal<Parse<'{ 1: "world" }'>, never>>,

  Expect<
    Equal<
      Parse<`{ "hello
  
  world": 123 }`>,
      never
    >
  >
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/6228/answer/zh-CN
  > 查看解答：https://tsch.js.org/6228/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
