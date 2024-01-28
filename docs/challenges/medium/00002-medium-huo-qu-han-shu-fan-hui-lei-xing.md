# 获取函数返回类型

<BtnGroup 
  issue="https://tsch.js.org/2/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31892"
/>

> 题目

不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 泛型。

例如：

```ts
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // 应推导出 "1 | 2"
```

> 解答

```ts
type MyReturnType<T> = T extends (...args: never[]) => infer R ? R : never;
```
