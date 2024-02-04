# Drop Char

<BtnGroup 
  issue="https://tsch.js.org/2070/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/32009"
/>

> 题目

从字符串中剔除指定字符。

例如：

```ts
type Butterfly = DropChar<" b u t t e r f l y ! ", " ">; // 'butterfly!'
```

> 解答

```ts
type DropChar<S, C> = S extends `${infer First}${infer Rest}`
  ? First extends C
    ? DropChar<Rest, C>
    : `${First}${DropChar<Rest, C>}`
  : S;
```

或者在解构中加入 `C`，完成模板字符占位：

```ts
type DropChar<S, C extends string> = S extends `${infer L}${C}${infer R}`
  ? DropChar<`${L}${R}`, C>
  : S;
```
