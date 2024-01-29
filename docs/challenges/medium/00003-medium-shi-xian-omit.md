# 实现 Omit

<BtnGroup 
  issue="https://tsch.js.org/3/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31909"
/>

> 题目

不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。

`Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

例如：

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, "description" | "title">;

const todo: TodoPreview = {
  completed: false,
};
```

> 解答

- 限制 `K` 为 `T` 的属性：`K extends keyof T`
- 若 `K` 在 `T` 的属性中，则返回 `{ never: T[K] }`
- 若 `K` 不在 `T` 的属性中，则返回 `{ K: T[K] }`

```ts
type MyExclude<T, K> = T extends K ? never : T;

type MyOmit<T, K extends keyof T> = {
  [P in MyExclude<keyof T, K>]: T[P];
};
```

或者

```ts
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
```
