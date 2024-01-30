# 去除左侧空白

<BtnGroup 
  issue="https://tsch.js.org/106/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31926"
/>

> 题目

实现 `TrimLeft<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。

例如

```ts
type trimed = TrimLeft<"  Hello World  ">; // 应推导出 'Hello World  '
```

> 解答

- 使用 **模板字符** 来匹配“空字符串”
- 使用 `infer` 解构剩余字符
- 递归调用 `TrimLeft<S>` 直至所有字符处理完毕

```ts
type Space = " " | "\n" | "\t";

type TrimLeft<S extends string> = S extends `${Space}${infer R}`
  ? TrimLeft<R>
  : S;
```
