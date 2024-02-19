# Binary to Decimal

<BtnGroup 
	issue="https://tsch.js.org/6141/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/25878"
/>

> 题目

Implement `BinaryToDecimal<S>` which takes an exact string type `S` consisting 0 and 1 and returns an exact number type corresponding with `S` when `S` is regarded as a binary.
You can assume that the length of `S` is equal to or less than 8 and `S` is not empty.

```ts
type Res1 = BinaryToDecimal<"10">; // expected to be 2
type Res2 = BinaryToDecimal<"0011">; // expected to be 3
```

> 解答

```ts
// step1: 将字符串转换为tuple ，为了能够使用 ... 操作符控制 infer 的位置
type StringToTuple<S extends string> = S extends `${infer F}${infer R}`
  ? [F, ...StringToTuple<R>]
  : [];

// 用 res 存储最终的计算结果， arr 存储 1，2，4，8，16，遇到1，则将 Arr 长度加入 res
type Convert<
  T extends string[],
  Arr extends number[] = [1],
  Res extends number[] = []
> = T extends [...infer F extends string[], infer L]
  ? L extends "1"
    ? Convert<F, [...Arr, ...Arr], [...Res, ...Arr]>
    : Convert<F, [...Arr, ...Arr], Res>
  : Res["length"];

type BinaryToDecimal<S extends string> = Convert<StringToTuple<S>>;
```