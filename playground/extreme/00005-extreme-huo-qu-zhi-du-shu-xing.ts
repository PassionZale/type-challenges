/*
  5 - 获取只读属性
  -------
  by Anthony Fu (@antfu) #地狱 #utils #object-keys

  ### 题目

  实现泛型`GetReadonlyKeys<T>`，`GetReadonlyKeys<T>`返回由对象 T 所有只读属性的键组成的联合类型。

  例如

  ```ts
  interface Todo {
    readonly title: string
    readonly description: string
    completed: boolean
  }

  type Keys = GetReadonlyKeys<Todo> // expected to be "title" | "description"
  ```

  > 在 Github 上查看：https://tsch.js.org/5/zh-CN
*/

/* _____________ 你的代码 _____________ */

/**
 * 思路是将T的只读键key取出来，拿到一个{key:key}的类型（其中非只读属性的值均为never）并取value（会自动过滤掉never类型的值只剩下只读key）
 * Equal取原类型和已将原类型只读属性全去掉的类型（{ -readonly [R in P]: T[R] }）对比结果为真的赋值never，为假说明key类型不一样，赋值key（供最后一步取key）
 * [ P in keyof Required<T> ] 生成一个新类型，该类型与 T 拥有相同的属性，但是所有属性皆为必选项，保证能取到所有key
 * 最后一步keyof Result依然会获得所有key，即使有些key对应值为never，故而用Result{keyof T}取值过滤掉never
 **/
type GetReadonlyKeys<T> = {
  [P in keyof Required<T>]: Equal<
    { [k in P]: T[k] },
    { -readonly [R in P]: T[R] }
  > extends true
    ? never
    : P;
}[keyof T];

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<"title", GetReadonlyKeys<Todo1>>>,
  Expect<Equal<"title" | "description", GetReadonlyKeys<Todo2>>>
];

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  readonly description: string;
  completed?: boolean;
}

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/5/answer/zh-CN
  > 查看解答：https://tsch.js.org/5/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
