# 柯里化 2

<BtnGroup 
	issue="https://tsch.js.org/462/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/3697"
/>

> 题目

[Currying](https://en.wikipedia.org/wiki/Currying) 是一种将带有多个参数的函数转换为每个带有一个参数的函数序列的技术。

但是在前端的日常开发中，柯里化函数参数个数动态化却是非常常见的，例如 `Function.bind(this, [...params])`

```ts
const func = (a: number, b: number, c: number) => {
  return a + b + c;
};

const bindFunc = func(null, 1, 2);

const result = bindFunc(3); // result: 6
```

因此，在 `柯里化` 的基础上，我们更需要的是 `动态参数化的柯里化函数`

```ts
const add = (a: number, b: number, c: number) => a + b + c;
const three = add(1, 1, 1);

const curriedAdd = DynamicParamsCurrying(add);
const six = curriedAdd(1, 2, 3);
const seven = curriedAdd(1, 2)(4);
const eight = curriedAdd(2)(3)(4);
```

传递给 `DynamicParamsCurrying` 的函数可能有多个参数，您需要实现它的类型。

在此挑战中，curriedAdd 函数每次可接受最少一个参数，但是所有参数个数总和及类型与原函数相同。分配完所有参数后，它应返回其结果。

> 解答

```ts
type Curry<A, R, D extends unknown[] = []> = A extends [infer H, ...infer T]
  ? T extends []
    ? (...args: [...D, H]) => R
    : ((...args: [...D, H]) => Curry<T, R>) & Curry<T, R, [...D, H]>
  : () => R;

declare function DynamicParamsCurrying<A extends unknown[], R>(
  fn: (...args: A) => R
): Curry<A, R>;
```
