# CountReversePairs

<BtnGroup 
	issue="https://tsch.js.org/31447/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/31454"
/>

> 题目

Given an integer array nums, return the number of reverse pairs in the array.

A reverse pair is a pair (i, j) where:

- 0 <= i < j < nums.length and
- nums[i] > nums[j].

> 解答

```ts
type ParseNumber<S extends string> = S extends `${infer I}.${infer D}`
  ? [I, D]
  : [S, ""];
// l -> -1 e->0 g->1
type CompareLength<
  A extends string,
  B extends string
> = A extends `${string}${infer AR}`
  ? B extends `${string}${infer BR}`
    ? CompareLength<AR, BR>
    : 1
  : B extends A
  ? 0
  : -1;

type GreatConfig = {
  "0": "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  "1": "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  "2": "3" | "4" | "5" | "6" | "7" | "8" | "9";
  "3": "4" | "5" | "6" | "7" | "8" | "9";
  "4": "5" | "6" | "7" | "8" | "9";
  "5": "6" | "7" | "8" | "9";
  "6": "7" | "8" | "9";
  "7": "8" | "9";
  "8": "9";
  "9": never;
};

type CompareDigit<A extends string, B extends string> = A extends B
  ? 0
  : A extends keyof GreatConfig
  ? B extends GreatConfig[A]
    ? -1
    : 1
  : never;

type CompareDigits<
  A extends string,
  B extends string
> = A extends `${infer AF}${infer AR}`
  ? B extends `${infer BF}${infer BR}`
    ? CompareDigit<AF, BF> extends infer CR
      ? CR extends 0
        ? CompareDigits<AR, BR>
        : CR
      : never
    : 1
  : B extends A
  ? 0
  : -1;

type CompareNonNegetive<
  T extends string,
  U extends string,
  TP extends [string, string] = ParseNumber<T>,
  UP extends [string, string] = ParseNumber<U>,
  ByLength extends 0 | 1 | -1 = CompareLength<TP[0], UP[0]>
> = ByLength extends 0
  ? TP[0] extends UP[0]
    ? CompareDigits<TP[1], UP[1]>
    : CompareDigits<TP[0], UP[0]>
  : ByLength;

type LTE<A extends number, B extends number> = `${A}` extends `-${infer ABS_A}`
  ? `${B}` extends `-${infer ABS_B}`
    ? CompareNonNegetive<ABS_B, ABS_A> extends 1
      ? false
      : true
    : true
  : `${B}` extends `-${string}`
  ? false
  : CompareNonNegetive<`${A}`, `${B}`> extends 1
  ? false
  : true;

type SplitArray<
  T extends number[],
  L extends number[] = [],
  R extends number[] = []
> = T extends [
  infer A extends number,
  ...infer M extends number[],
  infer B extends number
]
  ? SplitArray<M, [...L, A], [B, ...R]>
  : T["length"] extends 1
  ? [[...L, T[0]], R]
  : [L, R];

type Merge<A extends number[], B extends number[], R extends number[] = []> = [
  A,
  B
] extends [
  [infer FA extends number, ...infer RA extends number[]],
  [infer FB extends number, ...infer RB extends number[]]
]
  ? LTE<FA, FB> extends true
    ? Merge<RA, B, [...R, FA]>
    : Merge<RB, A, [...R, FB]>
  : [...R, ...A, ...B];

type MergeSort<
  T extends number[],
  H extends [number[], number[]] = SplitArray<T>
> = T["length"] extends 0 | 1
  ? [T, []]
  : [MergeSort<H[0]>, MergeSort<H[1]>] extends [
      [infer LSorted extends number[], infer LC extends number[]],
      [infer RSorted extends number[], infer RC extends number[]]
    ]
  ? [Merge<LSorted, RSorted>, [...LC, ...RC, ...CountSorted<LSorted, RSorted>]]
  : never;

type CountSorted<
  T extends number[],
  U extends number[],
  R extends number[] = []
> = U extends [infer UF extends number, ...infer UR extends number[]]
  ? T extends [infer TF extends number, ...infer TR extends number[]]
    ? LTE<TF, UF> extends false
      ? CountSorted<T, UR, [...R, ...T]>
      : CountSorted<TR, U, R>
    : R
  : R;

type CountReversePairs<T extends number[]> = MergeSort<T>[1]["length"];
```
