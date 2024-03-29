/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #中等 #template-literal

  ### 题目

  Replace the `camelCase` or `PascalCase` string with `kebab-case`.

  `FooBarBaz` -> `foo-bar-baz`

  For example

  ```ts
  type FooBarBaz = KebabCase<"FooBarBaz">
  const foobarbaz: FooBarBaz = "foo-bar-baz"

  type DoNothing = KebabCase<"do-nothing">
  const doNothing: DoNothing = "do-nothing"
  ```

  > 在 Github 上查看：https://tsch.js.org/612/zh-CN
*/

/* _____________ 你的代码 _____________ */

namespace t00612 {
  /**
   * Typescript 内置类型：
   *
   * - Uppercase<StringType> 将字符串中的每个字符转换为大写
   * - Lowercase<StringType> 将字符串中的每个字符转换为小写
   *
   * - Capitalize<StringType> 将字符串中的第一个字符转换为等效的大写字符
   * - Uncapitalize<StringType> 将字符串中的第一个字符转换为等效的小写字符
   */

  // type UppercaseS = "FOOBARZ"
  type UppercaseS = Uppercase<"foobarz">;

  // type LowercaseS = "foobarz"
  type LowercaseS = Lowercase<"FooBarZ">;

  // type UncapitalizeS = "fooBarBaz"
  type UncapitalizeS = Uncapitalize<"FooBarBaz">;

  // type CapitalizeS = "FooBarBaz"
  type CapitalizeS = Capitalize<"fooBarBaz">;

  // 将驼峰转成蛇形
  type Uni = "FooBarBaz";

  // 第一步需要将首字符转换为小写
  // type S1 = "fooBarBaz"
  type S1 = Uncapitalize<Uni>;

  // 递归将大小字符转换为 `-${infer R}`
  type S2<T extends string> = T extends `${infer First}${infer Rest}`
    ? First extends Capitalize<First>
      ? `-${Lowercase<First>}${S2<Rest>}`
      : `${First}${S2<Rest>}`
    : T;

  // type S3 = "foo-bar-baz"
  type S3 = S2<S1>;
}

type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"fooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"foo-bar">, "foo-bar">>,
  Expect<Equal<KebabCase<"foo_bar">, "foo_bar">>,
  Expect<Equal<KebabCase<"Foo-Bar">, "foo--bar">>,
  Expect<Equal<KebabCase<"ABC">, "a-b-c">>,
  Expect<Equal<KebabCase<"-">, "-">>,
  Expect<Equal<KebabCase<"">, "">>,
  Expect<Equal<KebabCase<"😎">, "😎">>
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/612/answer/zh-CN
  > 查看解答：https://tsch.js.org/612/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
