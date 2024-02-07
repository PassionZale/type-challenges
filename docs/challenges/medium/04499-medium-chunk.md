# Chunk

<BtnGroup 
	issue="https://tsch.js.org/4499/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32094"
/>

> 题目

Do you know `lodash`? `Chunk` is a very useful function in it, now let's implement it.
`Chunk<T, N>` accepts two required type parameters, the `T` must be a `tuple`, and the `N` must be an `integer >=1`

```ts
type exp1 = Chunk<[1, 2, 3], 2>; // expected to be [[1, 2], [3]]
type exp2 = Chunk<[1, 2, 3], 4>; // expected to be [[1, 2, 3]]
type exp3 = Chunk<[1, 2, 3], 1>; // expected to be [[1], [2], [3]]
```

> 解答

```ts
type Chunk<
  T extends any[],
  U extends number = 1,
  S extends any[] = []
> = T extends [infer F, ...infer R]
  ? S["length"] extends U
    ? [S, ...Chunk<T, U>]
    : Chunk<R, U, [...S, F]>
  : S["length"] extends 0
  ? S
  : [S];
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/16479"
/>

> 数组递归，但是比之前的要难不少。

> 像这种需要判断递归深度的，肯定需要一个数组参数用来比较。我们就添加一个数组类型参数 `S`，不过，这里 `S` 不单是用于比较，而且要保存当前递归产生的结果片段。另外，我们再添加一个参数 `V`，方便记录最终结果。
>
> ```ts
> type Chunk<
>   T extends any[],
>   U extends number = 1,
>   S extends any[] = [],
>   V extends any[] = []
> > = any;
> ```
>
> 接着，我们判断 `T` 是否为空，如果不为空直接返回 `V` 就行了。
>
> ```ts
> type Chunk<
>   T extends any[],
>   U extends number = 1,
>   S extends any[] = [],
>   V extends any[] = []
> > = T extends [infer F, ...infer R] ? any : V;
> ```
>
> 递归的部分要怎样做呢？其实很简单。每次递归，我们把 `T` 中的第一个元素拿出来，放到 `S` 中，再在每次递归前判断 `S` 的长度是否和 `U` 相等，如果相等，将 `S` 推入 `V` 中并清空，否则继续递归。
>
> ```ts
> type Chunk<
>   T extends any[],
>   U extends number = 1,
>   S extends any[] = [],
>   V extends any[] = []
> > = T extends [infer F, ...infer R]
>   ? S["length"] extends U
>     ? Chunk<R, U, [F], [...V, S]>
>     : Chunk<R, U, [...S, F], V>
>   : V;
> ```
>
> 不过现在还有问题。因为我们总是在**下一次递归时**判断 `S['length']` 是否和 `U` 相等，那么当 `T` 为空时，`S` 中就会残留未被推入 `V` 中的元素。
>
> 另外，如果 `T` 为空，并且 `S` 也为空，说明最开始传入的 `T` 就是一个空数组。
>
> ```ts
> type Chunk<
>   T extends any[],
>   U extends number = 1,
>   S extends any[] = [],
>   V extends any[] = []
> > = T extends [infer F, ...infer R]
>   ? S["length"] extends U
>     ? Chunk<R, U, [F], [...V, S]>
>     : Chunk<R, U, [...S, F], V>
>   : S["length"] extends 0
>   ? V
>   : [...V, S];
> ```
>
> 至此这道题就搞定了。不过我们还有优化的空间，那就是 `V`，我们能不能把 `V` 去掉呢？
>
> 当然可以！我们稍作修改：
>
> ```ts
> type Chunk<
>   T extends any[],
>   U extends number = 1,
>   S extends any[] = []
> > = T extends [infer F, ...infer R]
>   ? S["length"] extends U
>     ? [S, ...Chunk<T, U>]
>     : Chunk<R, U, [...S, F]>
>   : S["length"] extends 0
>   ? S
>   : [S];
> ```
>
> `[S, ...Chunk<T, U>]` 这部分变化很大，但它的作用与之前一样，那就是**将 `S` 推入结果，并传递参数继续递归**。如果干看不能理解，那么可以适当推演一下，很快就能明白。
