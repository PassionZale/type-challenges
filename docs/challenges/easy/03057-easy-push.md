# 标题

<BtnGroup 
  issue="https://tsch.js.org/3057/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31867"
/>

> 题目

在类型系统里实现通用的 `Array.push` 。

例如：

```typescript
type Result = Push<[1, 2], "3">; // [1, 2, '3']
```

> 解答

```ts
type Push<T extends unknown[], U> = [...T, ...[U]]
```

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/3874#issuecomment-1894993387"
/>

> why use unknow insteadof any
>
> see: https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown
>
> The unknown type represents any value. This is similar to the any type, but is safer because it’s not legal to do anything with an unknown value:
