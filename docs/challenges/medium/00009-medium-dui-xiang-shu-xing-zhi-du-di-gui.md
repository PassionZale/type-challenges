# 对象属性只读（递归）

<BtnGroup 
  issue="https://tsch.js.org/9/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31912"
/>

> 题目

实现一个泛型 `DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。不考虑数组、函数、类等。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

例如

```ts
type X = {
  x: {
    a: 1;
    b: "hi";
  };
  y: "hey";
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: "hi";
  };
  readonly y: "hey";
};

type Todo = DeepReadonly<X>; // should be same as `Expected`
```

> 解答

- 递归结束的时机：`keyof T extends never`
- 递归自身给属性增加 `readonly`：`{ readonly [k in keyof T]: DeepReadonly<T[k]> }`

```ts
// 仅考虑泛型为对象

type DeepReadonly<T> = keyof T extends never
  ? T
  : { readonly [k in keyof T]: DeepReadonly<T[k]> };
```

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/187#issuecomment-1582010196"
/>

```ts
type DeepReadonly<T> = T extends never
  ? T
  : keyof T extends never
  ? T
  : { readonly [k in keyof T]: DeepReadonly<T[k]> };

type DeepReadonly<T> = T extends string | Function
  ? T
  : {
      readonly [K in keyof T]: DeepReadonly<T[K]>;
    };
```
