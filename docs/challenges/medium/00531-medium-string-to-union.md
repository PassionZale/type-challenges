# String to Union

<BtnGroup 
  issue="https://tsch.js.org/531/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31962"
/>

> 题目

实现一个将接收到的 String 参数转换为一个字母 Union 的类型。

例如

```ts
type Test = "123";
type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
```

> 解答

```ts
type StringToUnion<T extends string> = T extends `${infer First}${infer Rest}`
  ? First | StringToUnion<Rest>
  : never;
```
