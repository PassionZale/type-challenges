# Append to object

<BtnGroup 
  issue="https://tsch.js.org/527/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31960"
/>

> 题目

实现一个为接口添加一个新字段的类型。该类型接收三个参数，返回带有新字段的接口类型。

例如:

```ts
type Test = { id: "1" };
type Result = AppendToObject<Test, "value", 4>; // expected to be { id: '1', value: 4 }
```

> 解答

```ts
type AppendToObject<T, U extends PropertyKey, V> = T extends object
  ? { [key in keyof T | U]: key extends keyof T ? T[key] : V }
  : T;
```
