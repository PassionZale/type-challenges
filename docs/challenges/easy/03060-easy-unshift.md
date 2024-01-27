# Unshift

<BtnGroup 
  issue="https://tsch.js.org/3060/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31868"
/>

> 题目

实现类型版本的 `Array.unshift`。

例如：

```typescript
type Result = Unshift<[1, 2], 0>; // [0, 1, 2,]
```

> 解答

```ts
type Unshift<T extends unknown[], U> = [...[U], ...T]
```
