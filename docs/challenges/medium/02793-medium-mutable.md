# Mutable

<BtnGroup 
	issue="https://tsch.js.org/2793/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32047"
/>

> 题目

实现一个通用的类型 `Mutable<T>`，使类型 `T` 的全部属性可变（非只读）。

例如：

```typescript
interface Todo {
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
}

type MutableTodo = Mutable<Todo>; // { title: string; description: string; completed: boolean; }
```

> 解答

```ts
type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K];
};
```
