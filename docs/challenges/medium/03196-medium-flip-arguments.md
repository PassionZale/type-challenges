
# Flip Arguments

<BtnGroup 
	issue="https://tsch.js.org/3196/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32082"
/>

> 题目

  Implement the type version of lodash's ```_.flip```.

  Type ```FlipArguments<T>``` requires function type ```T``` and returns a new function type which has the same return type of T but reversed parameters.

  For example:

  ```typescript
  type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
  // (arg0: boolean, arg1: number, arg2: string) => void
  ```

> 解答

同 [Reverse](/challenges/medium/03196-medium-flip-arguments.html)，

将函数的 `args` 套用 `Reverse` 进行反转即可：

```ts
type Reverse<T extends unknown[]> = T extends [infer F, ...infer R]
  ? [...Reverse<R>, F]
  : [];

type FlipArguments<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => infer U
  ? (...args: Reverse<P>) => U
  : never;
```