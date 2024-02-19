# Square

<BtnGroup 
	issue="https://tsch.js.org/27133/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32285"
/>

> 题目

Given a number, your type should return its square.

> 解答

```ts
type Abs<N extends number> = `${N}` extends `-${infer R extends number}`
  ? R
  : N;

type SplitZeroes<
  N extends number,
  Z extends string = ""
> = `${N}` extends `${infer N extends number}0`
  ? SplitZeroes<N, `${Z}00`>
  : [N, Z];

type SquareTuple<
  N extends number,
  A extends any[] = [],
  Acc extends any[] = []
> = A["length"] extends N
  ? [...A, ...Acc]
  : SquareTuple<N, [1, ...A], [...A, ...A, ...Acc]>;

type Square<
  _N extends number,
  N extends [number, string] = SplitZeroes<_N>,
  U extends any[] = SquareTuple<Abs<N[0]>>
> = `${U["length"]}${N[1]}` extends `${infer N extends number}` ? N : never;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/29275"
/>

> I use the fact that - n2=2∗Σi=1n−1+n. Initially was trying to use that for optimization, didn't help, kept for the sake of it.

> ```ts
> type Abs<N extends number> = `${N}` extends `-${infer R extends number}`
>   ? R
>   : N;
> type SplitZeroes<
>   N extends number,
>   Z extends string = ""
> > = `${N}` extends `${infer N extends number}0`
>   ? SplitZeroes<N, `${Z}00`>
>   : [N, Z];
> type SquareTuple<
>   N extends number,
>   A extends any[] = [],
>   Acc extends any[] = []
> > = A["length"] extends N
>   ? [...A, ...Acc]
>   : SquareTuple<N, [1, ...A], [...A, ...A, ...Acc]>;
>
> type Square<
>   _N extends number,
>   N extends [number, string] = SplitZeroes<_N>,
>   U extends any[] = SquareTuple<Abs<N[0]>>
> > = `${U["length"]}${N[1]}` extends `${infer N extends number}` ? N : never;
> ```
>
> Was also surprised to learn that `TestType2` hits recursion limit much faster than `TestType1` during this challenge even tho both types do essentially the same thing. I guess Type2 has to keep track of memory for each recursion layer while Type1 only has to keep track of "type function" calls while values themselves are being explicitly passed along.
>
> ```ts
> type TestType1<
>   N extends number,
>   A extends any[] = [],
>   Acc extends any[] = []
> > = A["length"] extends N
>   ? [...A, ...Acc]
>   : TestType1<N, [1, ...A], [...A, ...Acc]>;
>
> type TestType2<N extends number, A extends any[] = []> = A["length"] extends N
>   ? A
>   : [...A, ...TestType2<N, [1, ...A]>];
>
> type Example1 = TestType1<99>["length"]; // works fine
> type Example2 = TestType2<49>["length"]; // Type instantiation is excessively deep and possibly infinite
> ```
