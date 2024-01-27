# Parameters

<BtnGroup 
  issue="https://tsch.js.org/3312/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31870"
/>

> 题目

实现内置的 `Parameters<T>` 类型，而不是直接使用它，可参考[TypeScript 官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)。

例如：

```ts
const foo = (arg1: string, arg2: number): void => {};

type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]
```

> 解答

使用 `infer` 表示待推断的类型变量。

由于 `...args` 本身已经是元组类型，因此 `infer P` 最终推导出的，也是元组类型。

```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => unknown
  ? P
  : never
```
