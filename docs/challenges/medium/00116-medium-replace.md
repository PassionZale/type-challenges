# Replace

<BtnGroup 
  issue="https://tsch.js.org/116/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31932"
/>

> 题目

实现 `Replace<S, From, To>` 将字符串 `S` 中的第一个子字符串 `From` 替换为 `To` 。

例如

```ts
type replaced = Replace<"types are fun!", "fun", "awesome">; // 期望是 'types are awesome!'
```

> 解答

参考 [Capitalize](/challenges/medium/00110-medium-capitalize.html)，如果字符串中间添加某些推导条件（字符串值类型，可以看成常量），那则会按照推导条件进行字符串的分割：

```ts
S extends `${infer Left}${From}${infer Right}`
```

将 `From` 替换为 `To` 即可：

```ts
type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer Left}${From}${infer Right}`
  ? From extends ""
    ? S
    : `${Left}${To}${Right}`
  : S;
```
