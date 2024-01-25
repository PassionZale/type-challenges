# 实现 Exclude

<BtnGroup 
  issue="https://tsch.js.org/43/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31858"
/>

> 题目

实现内置的 `Exclude<T, U>` 类型，但不能直接使用它本身。

> 从联合类型 `T` 中排除 `U` 中的类型，来构造一个新的类型。

例如：

```ts
type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'
```

> 解答

```ts
type MyExclude<T, U> = T extends U ? never : T
```
