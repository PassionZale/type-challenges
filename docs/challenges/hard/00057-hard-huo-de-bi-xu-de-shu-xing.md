# 获得必需的属性

<BtnGroup 
	issue="https://tsch.js.org/57/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/285"
/>

> 题目

实现高级工具类型 `GetRequired<T>`，该类型保留所有必需的属性

例如

```ts
type I = GetRequired<{ foo: number; bar?: string }>; // expected to be { foo: number }
```

> 解答

```ts
type GetRequired<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P];
};
```
