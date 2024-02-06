# EndsWith

<BtnGroup 
	issue="https://tsch.js.org/2693/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32042"
/>

> 题目

实现`EndsWith<T, U>`,接收两个 string 类型参数,然后判断`T`是否以`U`结尾,根据结果返回`true`或`false`

例如:

```typescript
type a = EndsWith<"abc", "bc">; // expected to be true
type b = EndsWith<"abc", "abc">; // expected to be true
type c = EndsWith<"abc", "d">; // expected to be false
```

> 解答

同 [StartsWith](/challenges/medium/02688-medium-startswith.html)，反向推导即可：

```ts
type EndsWith<T extends string, U extends string> = T extends `${infer _}${U}`
  ? true
  : false;
```
