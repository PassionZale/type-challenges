# Greater Than

<BtnGroup 
	issue="https://tsch.js.org/4425/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32091"
/>

> 题目

In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

Negative numbers do not need to be considered.

For example

```ts
GreaterThan<2, 1>; //should be true
GreaterThan<1, 1>; //should be false
GreaterThan<10, 100>; //should be false
GreaterThan<111, 11>; //should be true
```

Good Luck!

> 解答

数字比大小，在 `ts` 中可以通过构建数组的方式，

将数字构建为数组，例如：

```ts
type NumberToArray<T extends number, U extends any[] = []> = [T] extends [
  U["length"]
]
  ? U
  : NumberToArray<T, [...U, ""]>;

// type A = ["", "", ""]
type A = NumberToArray<3>;

// type B = [""]
type B = NumberToArray<1>;
```

只要 `B` 无法满足 `[...A, ...infer _]`，那么 `B` 就比 `A` 的长度要小，

继而能判断出 `B` 小于 `A`：

```ts
type R = B extends [...A, ...infer _] ? false : true;
```

最后得出答案：

```ts
type NumberToArray<T extends number, U extends any[] = []> = [T] extends [
  U["length"]
]
  ? U
  : NumberToArray<T, [...U, ""]>;

type GreaterThan<
  T extends number,
  U extends number
> = NumberToArray<U> extends [...NumberToArray<T>, ...infer _] ? false : true;
```

**上述答案无法判断 `bigint`**，可以浏览精选看看大家对于 `bigint` 的讨论。

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/21721"
/>

> I improved your answer as follows:
>
> ```
> // compares the first digits of T and U. If they are the same - compare rest of T and rest of U
> // prettier-ignore
> type GreaterThanSameDigitCount<
>   T extends number | string,
>   U extends number | string
> > = `${T}` extends `${infer TF}${infer TR}`
>   ? `${U}` extends `${infer UF}${infer UR}`
>     ? TF extends UF
>       ? GreaterThanSameDigitCount<TR, UR>
>       : "0123456789" extends `${string}${TF}${string}${UF}${string}`
>         ? false
>         : true
>     : true
>   : false;
>
> type DigitsToArr<S extends string> = S extends `${string}${infer R}`
>   ? [0, ...DigitsToArr<R>]
>   : [];
>
> type ArrLenCompare<
>   T extends any[],
>   U extends any[]
> > = "0123456789" extends `${string}${T["length"]}${string}${U["length"]}${string}`
>   ? -1
>   : "0123456789" extends `${string}${U["length"]}${string}${T["length"]}${string}`
>   ? 1
>   : 0;
>
> type GreaterThan<T extends number, U extends number> = ArrLenCompare<
>   DigitsToArr<`${T}`>,
>   DigitsToArr<`${U}`>
> > extends 0
>   ? GreaterThanSameDigitCount<T, U>
>   : ArrLenCompare<DigitsToArr<`${T}`>, DigitsToArr<`${U}`>> extends 1
>   ? true
>   : false;
> ```
