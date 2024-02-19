# 必需的键

<BtnGroup 
	issue="https://tsch.js.org/89/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/2664"
/>

> 题目

实现高级工具类型 `RequiredKeys<T>`，该类型返回 T 中所有必需属性的键组成的一个联合类型。

例如

```ts
type Result = RequiredKeys<{ foo: number; bar?: string }>;
// expected to be “foo”
```

> 解答

可以结合[获得必需的属性](/challenges/hard/00057-hard-huo-de-bi-xu-de-shu-xing.html)：

```ts
type GetRequired<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P];
};

type RequiredKeys<T> = keyof GetRequired<T>;
```

或者使用其他方式：

```ts
type RequiredKeys<T> = keyof {
  [K in keyof T as {} extends Pick<T, K> ? never : K]: T[K];
};
```
