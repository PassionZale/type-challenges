# Merge

<BtnGroup 
  issue="https://tsch.js.org/559/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31963"
/>

> 题目

将两个类型合并成一个类型，第二个类型的键会覆盖第一个类型的键。

例如

```ts
type foo = {
  name: string;
  age: string;
};

type coo = {
  age: number;
  sex: string;
};

type Result = Merge<foo, coo>; // expected to be {name: string, age: number, sex: string}
```

> 解答

```ts
type Merge<F extends object, S extends object> = {
  [key in keyof F | keyof S]: key extends keyof S
    ? S[key]
    : key extends keyof F
    ? F[key]
    : never;
};
```
