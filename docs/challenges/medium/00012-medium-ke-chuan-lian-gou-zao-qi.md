# 可串联构造器

<BtnGroup 
  issue="https://tsch.js.org/12/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31920"
/>

> 题目

在 JavaScript 中我们经常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给它赋上类型吗？

在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 `option(key, value)` 和 `get()`。在 `option` 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 `get` 获取最终结果。

例如

```ts
declare const config: Chainable;

const result = config
  .option("foo", 123)
  .option("name", "type-challenges")
  .option("bar", { value: "Hello World" })
  .get();

// 期望 result 的类型是：
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}
```

你只需要在类型层面实现这个功能 - 不需要实现任何 TS/JS 的实际逻辑。

你可以假设 `key` 只接受字符串而 `value` 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 `key` 只会被使用一次。

> 解答

```ts
type Chainable<T = {}> = {
  option: <K extends string, V>(
    key: K extends keyof T ? never : K,
    value: V
  ) => K extends keyof T
    ? Chainable<Omit<T, K> & Record<K, V>>
    : Chainable<T & Record<K, V>>
  get: () => T;
};
```

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/13951"
/>

> ```ts
> type Chainable<T = {}> = {
>   option: <K extends string, V>(key: K extends keyof T ?
>     V extends T[K] ? never : K
>     : K, value: V) => Chainable<Omit<T, K> & Record<K, V>>
>   get: () => T
> }
> ```
> 
> 前三步基于： #13879
> 
> 1. 可以使用 T = {} 来作为默认值，甚至默认参数与默认返回值，再通过递归传递 T 即可实现递归全局记录
> 2. option 是一个函数接收两个值：K 和 V，为了约束 key 不可重复必须范型传入，value 是任意类型范型不做约束直接透传
> 
> ```ts
> type Chainable<T = {}> = {
>   option: <K extends string, V>(key: K, value: V) => Chainable<T & Record<K, V>>
>   get: () => T
> }
> ```
> 
> 3. 先验证重复 key，实现传入相同 key 报错
> 
> ```ts
> type Chainable<T = {}> = {
>   option: <K extends string, V>(key: K extends keyof T ? never : K, value: V)
>     => Chainable<T & Record<K, V>>
>   get: () => T
> }
> ```
> 
> 4.然后发现案例3无法通过，案例3是传入了相同的 key 但类型不同，因此在 `K extends keyof T` 后面增加验证只有类型相同才返回 never
> 
> ```ts
> type Chainable<T = {}> = {
>   option: <K extends string, V>(key: K extends keyof T ?
>     V extends T[K] ? never : K
>     : K, value: V) => Chainable<T & Record<K, V>>
>   get: () => T
> }
> ```
> 
> 5.最后直接 & 联合并不能将相同 key 的类型覆盖，因此用 `Omit` 去掉前一个类型中相同的 key
> 
> ```ts
> type Chainable<T = {}> = {
>   option: <K extends string, V>(key: K extends keyof T ?
>     V extends T[K] ? never : K
>     : K, value: V) => Chainable<Omit<T, K> & Record<K, V>>
>   get: () => T
> }
> ```