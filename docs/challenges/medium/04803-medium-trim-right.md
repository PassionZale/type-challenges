# Trim Right

<BtnGroup 
	issue="https://tsch.js.org/4803/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32096"
/>

> 题目

实现 `TrimRight<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串结尾的空白字符串。

例如

```ts
type Trimed = TrimRight<"  Hello World  ">; // 应推导出 '  Hello World'
```

> 解答

```ts
type Space = `\n` | `\t` | " ";

type TrimRight<S extends string> = S extends `${infer Left}${Space}`
  ? TrimRight<Left>
  : S;
```
