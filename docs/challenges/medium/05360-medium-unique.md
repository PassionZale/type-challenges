# Unique

<BtnGroup 
	issue="https://tsch.js.org/5360/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32223"
/>

> 题目

实现类型版本的 `Lodash.uniq` 方法, `Unique<T>` 接收数组类型 T, 返回去重后的数组类型.

```ts
type Res = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
type Res2 = Unique<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
type Res3 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
type Res4 = Unique<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]
```

> 解答

```ts
type Includes<T, U> = U extends [infer F, ...infer Rest]
  ? Equal<F, T> extends true
    ? true
    : Includes<T, Rest>
  : false;

type Unique<T, U extends any[] = []> = T extends [infer R, ...infer F]
  ? Includes<R, U> extends true
    ? Unique<F, [...U]>
    : Unique<F, [...U, R]>
  : U;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/14151"
/>

> 这题需要借助辅助数组，通过递归的方式，依次把数组中没有的内容塞进去
>
> ```ts
> Includes<R, U> extends true
>       ? Unique<F, [...U]>
>       : Unique<F, [...U, R]>
> ```
>
> 这里就是递归的核心逻辑，如果数组 `U` 中不包含该元素，就塞进去，有就不塞
>
> 一开始判断数组中是否存在该元素，采用的是 `R extends U[number]` 但是发现有很多 case 没有考虑到
>
> 因此需要实现一个 `Includes` 方法来判断是否有该值，这个方法也是常规的递归实现，不多赘述
>
> ```ts
> // 答案
> type Includes<T, U> = U extends [infer F, ...infer Rest]
>   ? Equal<F, T> extends true
>     ? true
>     : Includes<T, Rest>
>   : false;
>
> type Unique<T, U extends any[] = []> = T extends [infer R, ...infer F]
>   ? Includes<R, U> extends true
>     ? Unique<F, [...U]>
>     : Unique<F, [...U, R]>
>   : U;
> ```
