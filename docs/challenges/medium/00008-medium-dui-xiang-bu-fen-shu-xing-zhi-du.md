# 对象部分属性只读

<BtnGroup 
  issue="https://tsch.js.org/8/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31910"
/>

> 题目

实现一个泛型`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。

类型 `K` 指定 `T` 中要被设置为只读 (readonly) 的属性。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

例如

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo: MyReadonly2<Todo, "title" | "description"> = {
  title: "Hey",
  description: "foobar",
  completed: false,
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
todo.completed = true; // OK
```

> 解答

**如果未提供`K`，则应使所有属性都变为只读**

因此泛型需要一个默认值：

```ts
type MyReadonly2<T, K extends keyof T = keyof T> = any;
```

**`K` 中的属性只读，其他的维持原状**

我们可以使用 `Pick<T, K>` 和 `Omit<T, K>` 分别取出 `K` 的属性与剩余属性：

```ts
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> &
  Readonly<Pick<T, K>>;
```

如果不用内置属性，也可以通过返回 `{ never: T[Key]} ` 的方式来进行过滤：

```ts
type MyReadonly2<T, K extends keyof T = keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
} & {
  readonly [Key in K]: T[Key];
};
```
