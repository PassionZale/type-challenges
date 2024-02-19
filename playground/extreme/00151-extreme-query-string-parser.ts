/*
  151 - Query String Parser
  -------
  by Pig Fang (@g-plane) #地狱 #template-literal

  ### 题目

  You're required to implement a type-level parser to parse URL query string into a object literal type.

  Some detailed requirements:

  - Value of a key in query string can be ignored but still be parsed to `true`. For example, `'key'` is without value, so the parser result is `{ key: true }`.
  - Duplicated keys must be merged into one. If there are different values with the same key, values must be merged into a tuple type.
  - When a key has only one value, that value can't be wrapped into a tuple type.
  - If values with the same key appear more than once, it must be treated as once. For example, `key=value&key=value` must be treated as `key=value` only.

  > 在 Github 上查看：https://tsch.js.org/151/zh-CN
*/

/* _____________ 你的代码 _____________ */

type ParseQueryString<S extends string> = S extends ""
  ? {}
  : MergeParams<SplitParams<S>>;

// e.g. 'k1=v1&k2=v2&k2=v3&k1' => ['k1=v1', 'k2=v2', 'k2=v3', 'k1']
type SplitParams<S extends string> = S extends `${infer E}&${infer Rest}`
  ? [E, ...SplitParams<Rest>]
  : [S];

// e.g. ['k1=v1', 'k2=v2', 'k2=v3', 'k1']
// => { k1: 'v1' } => { k1: 'v1', k2: ['v2', 'v3'] } => { k1: ['v1', true], k2: ['v2', 'v3'] }
type MergeParams<T extends string[], M = {}> = T extends [
  infer E,
  ...infer Rest extends string[]
]
  ? E extends `${infer K}=${infer V}`
    ? MergeParams<Rest, SetProperty<M, K, V>>
    : E extends `${infer K}`
    ? MergeParams<Rest, SetProperty<M, K>>
    : never
  : M;

// e.g. {} => { K: V }, { K: V1 } => { K: [V1, V] }, { K1: V1 } => { K1: V1, K: V }
type SetProperty<T, K extends PropertyKey, V extends any = true> = {
  [P in keyof T | K]: P extends K
    ? P extends keyof T // duplicate key exists
      ? T[P] extends V
        ? T[P] // duplicate k-v pair: no change
        : T[P] extends any[] // existing value is a tuple
        ? // append new value only if it doesn't already exist in the tuple
          V extends T[P][number]
          ? T[P]
          : [...T[P], V]
        : [T[P], V] // reassign value to tuple initialized with existing and new value
      : V // no duplicate key -> assign new k-v pair
    : P extends keyof T
    ? T[P]
    : never;
};

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ParseQueryString<"">, {}>>,
  Expect<Equal<ParseQueryString<"k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k2">, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2">, { k1: ["v1", "v2"] }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2">, { k1: "v1"; k2: "v2" }>>,
  Expect<
    Equal<ParseQueryString<"k1=v1&k2=v2&k1=v2">, { k1: ["v1", "v2"]; k2: "v2" }>
  >,
  Expect<Equal<ParseQueryString<"k1=v1&k2">, { k1: "v1"; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2&k1=v1">, { k1: ["v1", "v2"] }>>,
  Expect<
    Equal<
      ParseQueryString<"k1=v1&k2=v1&k1=v2&k1=v1">,
      { k1: ["v1", "v2"]; k2: "v1" }
    >
  >,
  Expect<
    Equal<
      ParseQueryString<"k1=v1&k2=v2&k1=v2&k1=v3">,
      { k1: ["v1", "v2", "v3"]; k2: "v2" }
    >
  >,
  Expect<Equal<ParseQueryString<"k1=v1&k1">, { k1: ["v1", true] }>>,
  Expect<Equal<ParseQueryString<"k1&k1=v1">, { k1: [true, "v1"] }>>
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/151/answer/zh-CN
  > 查看解答：https://tsch.js.org/151/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
