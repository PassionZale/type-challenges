# Absolute

<BtnGroup 
  issue="https://tsch.js.org/529/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31961"
/>

> 题目

实现一个接收 string,number 或 bigInt 类型参数的`Absolute`类型,返回一个正数字符串。

例如

```ts
type Test = -100;
type Result = Absolute<Test>; // expected to be "100"
```

> 解答

`Typescript` 中不像 `Javascript` 拥有类型转换的方法，

此处使用模板字符串 + `infer` 来进行推导和替换：

```ts
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}`
  ? R
  : `${T}`;
```
