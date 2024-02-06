# RequiredByKeys

<BtnGroup 
	issue="https://tsch.js.org/2759/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32046"
/>

> 题目

实现一个通用的`RequiredByKeys<T, K>`，它接收两个类型参数`T`和`K`。

`K`指定应设为必选的`T`的属性集。当没有提供`K`时，它就和普通的`Required<T>`一样使所有的属性成为必选的。

例如:

```ts
interface User {
  name?: string;
  age?: number;
  address?: string;
}

type UserRequiredName = RequiredByKeys<User, "name">; // { name: string; age?: number; address?: string }
```

> 解答

参考 [PartialByKeys](/challenges/medium/02757-medium-partialbykeys.html)，

如果需要属性可选，可以使用 `key?: T[key]`，

如果需要属性必填，可以使用 `key-?: T[key]`。

```ts
type MergeType<T> = {
  [P in keyof T]: T[P];
};

type RequiredByKeys<T, K extends keyof T = keyof T> = MergeType<
  {
    [P in keyof T as P extends K ? P : never]-?: T[P];
  } & {
    [P in keyof T as P extends K ? never : P]: T[P];
  }
>;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/8405"
/>

也可以使用 `Omit` & `Required` 内置类型完成:

```ts
type RequiredByKeys<T, K extends keyof T = keyof T> = Omit<
  T & Required<Pick<T, K & keyof T>>,
  never
>;
```
