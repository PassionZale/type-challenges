# Sort

<BtnGroup 
	issue="https://tsch.js.org/741/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/11688"
/>

> 题目

In this challenge, you are required to sort natural number arrays in either ascend order or descent order.

Ascend order examples:

```ts
Sort<[]>; // []
Sort<[1]>; // [1]
Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>; //  [2, 4, 5, 6, 6, 6, 7, 8, 9]
```

The `Sort` type should also accept a boolean type. When it is `true`, the sorted result should be in descent order. Some examples:

```ts
Sort<[3, 2, 1], true>; // [3, 2, 1]
Sort<[3, 2, 0, 1, 0, 0, 0], true>; // [3, 2, 1, 0, 0, 0, 0]
```

Extra challenges:

1. Support natural numbers with 15+ digits.
2. Support float numbers.

> 解答

```ts
type Sort<A extends number[], D extends boolean = false> = A extends [
  infer A0 extends number,
  infer A1 extends number,
  ...infer AR extends number[]
]
  ? Split<[A1, ...AR], A0> extends [
      infer Lower extends number[],
      infer Higher extends number[]
    ]
    ? D extends true
      ? [...Sort<Higher, D>, A0, ...Sort<Lower, D>]
      : [...Sort<Lower, D>, A0, ...Sort<Higher, D>]
    : never
  : A;

// <[5, 1, 4, 2, 3], 3> -> [[1, 2], [5, 4, 3]]; <[1, 2, 3], 4> -> [[1, 2, 3], []]
type Split<
  A extends number[],
  M extends number,
  Lower extends number[] = [],
  Higher extends number[] = []
> = A extends [infer H extends number, ...infer T extends number[]]
  ? IsLower<H, M> extends true
    ? Split<T, M, [...Lower, H], Higher>
    : Split<T, M, Lower, [...Higher, H]>
  : [Lower, Higher];

// <2, 4> -> true; <4, 2> -> false; <2, 2> -> false
type IsLower<
  A extends number,
  B extends number
> = "0123456789" extends `${string}${A}${string}${B}${string}` ? true : false;
```
