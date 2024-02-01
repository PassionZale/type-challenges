# KebabCase

<BtnGroup 
  issue="https://tsch.js.org/612/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31972"
/>

> 题目

Replace the `camelCase` or `PascalCase` string with `kebab-case≤`.

`FooBarBaz` -> `foo-bar-baz`

For example

```ts
type FooBarBaz = KebabCase<"FooBarBaz">;
const foobarbaz: FooBarBaz = "foo-bar-baz";

type DoNothing = KebabCase<"do-nothing">;
const doNothing: DoNothing = "do-nothing";
```

> 解答

```ts
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
```

合并答案：

```ts
type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S;
```
