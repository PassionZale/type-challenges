# 可选类型的键

<BtnGroup 
	issue="https://tsch.js.org/90/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/210"
/>

> 题目

实现高级工具类型`OptionalKeys<T>`，该类型将 T 中所有可选属性的键合并为一个联合类型。

> 解答

可以结合[获得可选属性](/challenges/hard/00059-hard-huo-de-ke-xuan-shu-xing.html)：

```ts
type GetOptional<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P];
};

type OptionalKeys<T> = keyof GetOptional<T>;
```

或者使用其他方式：

```ts
type OptionalKeys<T> = {
  [P in keyof T]-?: {} extends Pick<T, P> ? P : never;
}[keyof T];
```
