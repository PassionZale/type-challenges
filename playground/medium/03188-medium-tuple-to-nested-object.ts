/*
  3188 - Tuple to Nested Object
  -------
  by jiangshan (@jiangshanmeta) #中等 #object #tuple

  ### 题目

  Given a tuple type ```T``` that only contains string type, and a type ```U```, build an object recursively.

  ```typescript
  type a = TupleToNestedObject<['a'], string> // {a: string}
  type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
  type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
  ```

  > 在 Github 上查看：https://tsch.js.org/3188/zh-CN
*/

/* _____________ 你的代码 _____________ */

type TupleToNestedObject<T, U> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/3188/answer/zh-CN
  > 查看解答：https://tsch.js.org/3188/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
