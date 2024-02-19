# 获得可选属性

<BtnGroup 
	issue="https://tsch.js.org/59/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/286"
/>

> 题目

实现高级工具类型 `GetOptional<T>`，该类型保留所有可选属性

例如

```ts
type I = GetOptional<{ foo: number; bar?: string }>; // expected to be { bar?: string }
```

> 解答

```ts
type GetOptional<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P];
};
```
