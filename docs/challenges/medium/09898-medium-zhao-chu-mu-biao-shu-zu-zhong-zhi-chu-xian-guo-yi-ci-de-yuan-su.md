# 找出目标数组中只出现过一次的元素

<BtnGroup 
	issue="https://tsch.js.org/9898/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32265"
/>

> 题目

找出目标数组中只出现过一次的元素。例如：输入[1,2,2,3,3,4,5,6,6,6]，输出[1,4,5]

> 解答

```ts
type Has<T extends any[], K> = T extends [infer Left, ...infer Rest]
  ? Equal<Left, K> extends true
    ? true
    : Has<Rest, K>
  : false;

type FindEles<
  T extends any[],
  R extends any[] = [],
  Old extends any[] = []
> = T extends [infer First, ...infer Rest]
  ? Has<[...Rest, ...Old], First> extends true
    ? FindEles<Rest, R, [...Old, First]>
    : FindEles<Rest, [...R, First], [...Old, First]>
  : R;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/24683"
/>

> ```ts
> // your answers
> // solution1：Unable to handle arrays that contain types such as number or any.
> type FindEles<
>   T extends any[],
>   K extends unknown[] = [],
>   Res extends unknown[] = []
> > = T extends [infer Left, ...infer Rest]
>   ? Left extends Rest[number]
>     ? FindEles<Rest, [...K, Left], Res>
>     : Left extends K[number]
>     ? FindEles<Rest, K, Res>
>     : FindEles<Rest, K, [...Res, Left]>
>   : Res;
> // solution2：
> type Has<T extends any[], K> = T extends [infer Left, ...infer Rest]
>   ? Equal<Left, K> extends true
>     ? true
>     : Has<Rest, K>
>   : false;
> type FindEles<
>   T extends any[],
>   K extends unknown[] = [],
>   Res extends unknown[] = []
> > = T extends [infer Left, ...infer Rest]
>   ? Has<Rest, Left> extends true
>     ? FindEles<Rest, [...K, Left], Res>
>     : Has<K, Left> extends true
>     ? FindEles<Rest, K, Res>
>     : FindEles<Rest, K, [...Res, Left]>
>   : Res;
> ```
