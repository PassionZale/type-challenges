# IsAny

<BtnGroup 
	issue="https://tsch.js.org/223/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/232"
/>

> 题目

Sometimes it's useful to detect if you have a value with `any` type. This is especially helpful while working with third-party Typescript modules, which can export `any` values in the module API. It's also good to know about `any` when you're suppressing implicitAny checks.

So, let's write a utility type `IsAny<T>`, which takes input type `T`. If `T` is `any`, return `true`, otherwise, return `false`.

> 解答

```ts
type IsAny<T> = Equal<T, any>;
```

更巧妙的解法：

```ts
type IsAny<T> = 0 extends 1 & T ? true : false;
```
