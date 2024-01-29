# Awaited

<BtnGroup 
  issue="https://tsch.js.org/189/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31859"
/>

> 题目

假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。

在 TS 中，我们用 `Promise<T>` 中的 T 来描述这个 Promise 返回的类型。

请你实现一个类型，可以获取这个类型。

例如：`Promise<ExampleType>`，请你返回 ExampleType 类型。

```ts
type ExampleType = Promise<string>;

type Result = MyAwaited<ExampleType>; // string
```

这个挑战来自于 [@maciejsikora](https://github.com/maciejsikora) 的文章：[original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4)

> 解答

**这是第一次遇到递归**

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U>
  ? U extends PromiseLike<any>
    ? MyAwaited<U>
    : U
  : never;
```

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/24969"
/>

> Promise 类型需要满足 Promise A+ 的一切标准，但是开发者自己实现的 Promise 有可能并不标准，比如只有 .then 方法。所以需要使用 PromiseLike 类型
