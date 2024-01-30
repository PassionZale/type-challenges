# Capitalize

<BtnGroup 
  issue="https://tsch.js.org/110/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31928"
/>

> 题目

实现 `Capitalize<T>` 它将字符串的第一个字母转换为大写，其余字母保持原样。

例如

```ts
type capitalized = Capitalize<"hello world">; // expected to be 'Hello world'
```

> 解答

使用内置类型 `Uppercase<T>` 可以将字符串转换为大写，

而后需要剔除第一个字符串，获取剩余字符，

如果是解构数组，可以像这样：

```ts
type ArrFirst<T extends unknown[]> = T extends [infer First, ...infer _]
  ? First
  : never;

type ArrLast<T extends unknown[]> = T extends [...infer _, infer Last]
  ? Last
  : never;
```

如果是字符串，我们可以通过模板字符串 + infer 来推导第一个字符和剩余字符：

```ts
S extends `${infer First}${infer Rest}`
```

最后通过模板字符组装返回首字符大写后的完整字符：

```ts
type MyCapitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S;
```

如果

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/759"
/>

如果字符串仅使用 infer 进行推导而不参杂其他信息，那前面的 infer 每次只会推导出一个字符，最后一个 infer 会推导出剩下所有的字符，如：

```ts
type Split<S> = S extends `${infer l}${infer r}` ? `${l} ${r}` : never;
// Split<'123-4567890'> -> l = '1', r = '23-4567890' -> result = '1 23-457890'
```

如果字符串中间添加某些推导条件（字符串值类型，可以看成常量），那则会按照推导条件进行字符串的分割：

```ts
type Split<S> = S extends `${infer l}-${infer r}` ? `${l} ${r}` : never;
// Split<'123-4567890'> -> l = '123', r = '4567890' -> result = '123 4567890'
```
