# Fill

<BtnGroup 
	issue="https://tsch.js.org/4518/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32095"
/>

> 题目

`Fill`, a common JavaScript function, now let us implement it with types.
`Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters, of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
The requirements for these parameters are: `T` must be a `tuple`, `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.

```ts
type exp = Fill<[1, 2, 3], 0>; // expected to be [0, 0, 0]
```

In order to simulate the real function, the test may contain some boundary conditions, I hope you can enjoy it :)

> 解答

```ts
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"],
  Count extends any[] = [],
  Flag extends boolean = Count["length"] extends Start ? true : false
> = Count["length"] extends End
  ? T
  : T extends [infer R, ...infer U]
  ? Flag extends false
    ? [R, ...Fill<U, N, Start, End, [...Count, 0]>]
    : [N, ...Fill<U, N, Start, End, [...Count, 0], Flag>]
  : T;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/14102"
/>

> 这题需要引入两个变量，一个用来计数，一个用来作为是否替换的标志
>
> - `Count extends any[] = []`
> - `Flag extends boolean = Count['length'] extends Start ? true : false`
>   几个关键点
>
> 1. 在 `Count` 等于 `End` 的时候需要结束替换，也就是结束条件
> 2. 当 `Count` 等于 `Start` 的时候是开始替换的条件，递归处理数组替换即可，注意需要把 `T` 换成新的
> 3. 在开始替换后，需要把 `Flag` 继续传下去，不然 `Flag` 会被置为 `false` 不再替换
>
> ```ts
> type Fill<
>   T extends unknown[],
>   N,
>   Start extends number = 0,
>   End extends number = T["length"],
>   Count extends any[] = [],
>   Flag extends boolean = Count["length"] extends Start ? true : false
> > = Count["length"] extends End
>   ? T
>   : T extends [infer R, ...infer U]
>   ? Flag extends false
>     ? [R, ...Fill<U, N, Start, End, [...Count, 0]>]
>     : [N, ...Fill<U, N, Start, End, [...Count, 0], Flag>]
>   : T;
> ```
