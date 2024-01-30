# ReplaceAll

<BtnGroup 
  issue="https://tsch.js.org/119/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31933"
/>

> 题目

实现 `ReplaceAll<S, From, To>` 将一个字符串 `S` 中的所有子字符串 `From` 替换为 `To`。

例如

```ts
type replaced = ReplaceAll<"t y p e s", " ", "">; // 期望是 'types'
```

> 解答

参考 [Replace](/challenges/medium/00116-medium-replace.html)，只需要将 `R` 递归调用 `ReplaceAll` 即可：

```ts
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${ReplaceAll<R, From, To>}`
  : S;
```
