# 去除两端空白字符

<BtnGroup 
  issue="https://tsch.js.org/108/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31927"
/>

> 题目

实现`Trim<T>`，它接受一个明确的字符串类型，并返回一个新字符串，其中两端的空白符都已被删除。

例如

```ts
type trimed = Trim<"  Hello World  ">; // expected to be 'Hello World'
```

> 解答

同 [去除左侧空白](/challenges/medium/00106-medium-qu-chu-zuo-ce-kong-bai.html)，去除两端空白字符，可以先递归去除左边再递归去除右边。

```ts
type Space = " " | "\n" | "\t";

type Trim<S extends string> = S extends `${Space}${infer R}`
  ? Trim<R>
  : S extends `${infer L}${Space}`
  ? Trim<L>
  : S;
```

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/481"
/>

使用联合类型，合并 “去除左边空白” 和 “去除右边字符”：

> ```ts
> type Space = ' ' | '\t' | '\n';
> 
> type Trim<S extends string> = S extends `${Space}${infer T}` | `${infer T}${Space}` ? Trim<T> : S;
> ```

