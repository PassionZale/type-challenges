# PartialByKeys

<BtnGroup 
	issue="https://tsch.js.org/2757/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32044"
/>

> 题目

实现一个通用的`PartialByKeys<T, K>`，它接收两个类型参数`T`和`K`。

`K`指定应设置为可选的`T`的属性集。当没有提供`K`时，它就和普通的`Partial<T>`一样使所有属性都是可选的。

例如:

```ts
interface User {
  name: string;
  age: number;
  address: string;
}

type UserPartialName = PartialByKeys<User, "name">; // { name?:string; age:number; address:string }
```

> 解答

没有提供 `K` 时，则所有属性可选，使用 `K = keyof T` 进行默认复制，让 `K` 默认全部为 `T` 的属性即可。

为了满足下方 `case` 的报错，需要约束 `K` 为 `T` 中的属性，需要为 `K` 增加约束条件：`K extends keyof T = keyof T`。

```ts
// @ts-expect-error
Expect<Equal<PartialByKeys<User, "name" | "unknown">, UserPartialName>>;
```

在 `K` 中的属性使用 `?` 来进行缺省：

`[P in keyof T as P extends K ? P : never]?: T[P];`

不在 `K` 中的属性，不需要缺省：

`[P in keyof T as P extends K ? never : P]: T[P];`

再使用交叉类型 `&`，最终你可能会得到答案：

```ts
type PartialByKeys<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? P : never]?: T[P];
} & {
  [P in keyof T as P extends K ? never : P]: T[P];
};
```

**但是这是错误的**，使用 `&` 拼接得到的是交叉类型，答案需要返回一个对象类型，对象类型和交叉类型是不相等的，例如：

```ts
import type { Equal, Expect } from "@type-challenges/utils";

type A = {
  name: string;
};

type B = {
  age: number;
};

type AB = {
  name: string;
  age: number;
};

type AandB = A & B;

// type result = false
type result = Equal<AandB, AB>;
```

因此还需要将交叉类型再 `Merge` 一次，最后得到答案：

```ts
type MergeType<O> = {
  [P in keyof O]: O[P];
};

type PartialByKeys<T, K extends keyof T = keyof T> = MergeType<
  {
    [P in keyof T as P extends K ? P : never]?: T[P];
  } & {
    [P in keyof T as P extends K ? never : P]: T[P];
  }
>;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/5395#issuecomment-1125668258"
/>

```ts
type PartialByKeys<T extends {}, U = keyof T> = Omit<
  Partial<Pick<T, U & keyof T>> & Omit<T, U & keyof T>,
  never
>;
```

> @k1ngbanana and anyone else finding this solution wondering what the purpose of the `Omit<T, never>` is doing: it's basically just creating a new type which is a single object with all the properties/values from the two intersected types.
>
> In particular, using`Omit<T, never>` is just a slick way of implementing the `Copy` or `Merge` types that are common in most of the other solutions.
>
> Omit is defined as:
>
> ```ts
> type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
> ```
>
> When `K` (in the definition of `Omit`, above) is `never`, it's the same thing as doing:
>
> ```ts
> Pick<T, keyof T>;
> ```
>
> and `Pick`'s implementation looks like:
>
> ```ts
> type Pick<T, K> = { [P in K]: T[P] };
> ```
>
> So, `Pick<T, keyof T>` is the same as doing `{ [P in keyof T]: T[P] }`, which just produces a new type where all the properties/values have been aggregated into a single object.
>
> To sum up, these are all equivalent:
>
> - This solution (using `Omit`):
>   ```ts
>   type PartialByKeys<T extends {}, U = keyof T> = Omit<
>     Partial<Pick<T, U & keyof T>> & Omit<T, U & keyof T>,
>     never
>   >;
>   ```
> - Using `Pick`:
>   ```ts
>   type PartialByKeys<T extends {}, U = keyof T> = Pick<
>     Partial<Pick<T, U & keyof T>> & Omit<T, U & keyof T>,
>     keyof T
>   >;
>   ```
> - A "custom" copy/merge helper type:
>   ```ts
>   type _Copy<T> = { [K in keyof T]: T[K] };
>   type PartialByKeys<T extends {}, U = keyof T> = _Copy<
>     Partial<Pick<T, U & keyof T>> & Omit<T, U & keyof T>
>   >;
>   ```
