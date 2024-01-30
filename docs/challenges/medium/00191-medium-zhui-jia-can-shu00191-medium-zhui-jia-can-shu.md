# 追加参数

<BtnGroup 
  issue="https://tsch.js.org/191/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31940"
/>

> 题目

实现一个泛型 `AppendArgument<Fn, A>`，对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。

`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数。

```typescript
type Fn = (a: number, b: string) => number;

type Result = AppendArgument<Fn, boolean>;
// 期望是 (a: number, b: string, x: boolean) => number
```

本挑战来自于 [@maciejsikora](https://github.com/maciejsikora) 在 Dev.io 上的[文章](https://dev.to/macsikora/advanced-typescript-exercises-question-4-495c)

> 解答

`Typescript` 中函数可以使用 `...args` 进行解构，获取所有参数，

- 使用 `...args: infer R` 提取参数类型
- 使用 `infer T` 提取返回类型
- 使用 `[...R, A]` 扩展参数类型

```ts
type AppendArgument<Fn extends Function, A> = Fn extends (
  ...args: infer R
) => infer T
  ? (...args: [...R, A]) => T
  : never;
```

同理，也可以使用内置类型 `Parameters` 和 `ReturnType` 提取参数类型和返回值类型：

```ts
type AppendArgument<Fn extends Function, A> = (
  ...args: [...Parameters<Fn>, A]
) => ReturnType<Fn>;
```
