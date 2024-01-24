/*
  213 - Vue Basic Props
  -------
  by Anthony Fu (@antfu) #困难 #vue #application

  ### 题目

  **This challenge continues from [6 - Simple Vue](//tsch.js.org/6), you should finish that one first, and modify your code based on it to start this challenge**.

  In addition to the Simple Vue, we are now having a new `props` field in the options. This is a simplified version of Vue's `props` option. Here are some of the rules.

  `props` is an object containing each field as the key of the real props injected into `this`. The injected props will be accessible in all the context including `data`, `computed`, and `methods`.

  A prop will be defined either by a constructor or an object with a `type` field containing constructor(s).

  For example

  ```js
  props: {
    foo: Boolean
  }
  // or
  props: {
    foo: { type: Boolean }
  }
  ```

  should be inferred to `type Props = { foo: boolean }`.

  When passing multiple constructors, the type should be inferred to a union.

  ```ts
  props: {
    foo: { type: [Boolean, Number, String] }
  }
  // -->
  type Props = { foo: boolean | number | string }
  ```

  When an empty object is passed, the key should be inferred to `any`.

  For more specified cases, check out the Test Cases section.

  > `required`, `default`, and array props in Vue are not considered in this challenge.

  > 在 Github 上查看：https://tsch.js.org/213/zh-CN
*/

/* _____________ 你的代码 _____________ */

declare function VueBasicProps(options: any): any

/* _____________ 测试用例 _____________ */
import type { Debug, Equal, Expect, IsAny } from '@type-challenges/utils'

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>,
    ]

    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>,
      ]
    },
  },
})

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/213/answer/zh-CN
  > 查看解答：https://tsch.js.org/213/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
