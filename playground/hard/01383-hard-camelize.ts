/*
  1383 - Camelize
  -------
  by Denis (@denchiklut) #困难 #union #recursion

  ### 题目

  实现 Camelize 类型: 将对象属性名从 蛇形命名(下划线命名) 转换为 小驼峰命名

  ```ts
  Camelize<{
    some_prop: string,
    prop: { another_prop: string },
    array: [{ snake_case: string }]
  }>

  // expected to be
  // {
  //   someProp: string,
  //   prop: { anotherProp: string },
  //   array: [{ snakeCase: string }]
  // }
  ```

  > 在 Github 上查看：https://tsch.js.org/1383/zh-CN
*/

/* _____________ 你的代码 _____________ */

type SnakeToCamel<
  S extends string,
  Cap extends boolean = false
> = S extends `${infer Head}_${infer Tail}`
  ? `${Cap extends true ? Capitalize<Head> : Head}${SnakeToCamel<Tail, true>}`
  : Cap extends true
  ? Capitalize<S>
  : S;

type TerminalTypes = number | boolean | symbol | bigint | Function;

type Camelize<T> = {
  default: {
    [K in keyof T as Camelize<K>]: Camelize<T[K]>;
  };
  array: T extends [infer Head, ...infer Tail]
    ? [Camelize<Head>, ...Camelize<Tail>]
    : [];
  string: SnakeToCamel<T & string>;
  terminal: T;
}[T extends any[]
  ? "array"
  : T extends TerminalTypes
  ? "terminal"
  : T extends string
  ? "string"
  : /** default */
    "default"];

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<
    Equal<
      Camelize<{
        some_prop: string;
        prop: { another_prop: string };
        array: [
          { snake_case: string },
          { another_element: { yet_another_prop: string } },
          { yet_another_element: string }
        ];
      }>,
      {
        someProp: string;
        prop: { anotherProp: string };
        array: [
          { snakeCase: string },
          { anotherElement: { yetAnotherProp: string } },
          { yetAnotherElement: string }
        ];
      }
    >
  >
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/1383/answer/zh-CN
  > 查看解答：https://tsch.js.org/1383/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
