# Sum

<BtnGroup 
	issue="https://tsch.js.org/476/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/23343"
/>

> 题目

Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.

For example,

```ts
type T0 = Sum<2, 3>; // '5'
type T1 = Sum<"13", "21">; // '34'
type T2 = Sum<"328", 7>; // '335'
type T3 = Sum<1_000_000_000_000n, "123">; // '1000000000123'
```

> 解答

```ts
/**
 * @example
 * type Result = Sum<15, 8> // '23'
 *
 * type Step1A = NumberToArray<15> // [[0], [0, 0, 0, 0, 0]]
 * type Step1B = NumberToArray<8> // [[0, 0, 0, 0, 0, 0, 0, 0]]
 *
 * type Step2 = AddArray<Step1A, Step1B> // [[0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
 *
 * type Step3 = StRegulateArrayNumber<Step2> // [[0, 0], [0, 0, 0]]
 *
 * type Step4 = RegulatedArrayNumberToStringNumber<Step3> // '23'
 */
type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint
> = RegulatedArrayNumberToStringNumber<
  RegulateArrayNumber<AddArray<NumberToArray<A>, NumberToArray<B>>>
>;

type NumberToArray<
  T extends string | number | bigint,
  R extends 0[][] = []
> = `${T}` extends `${infer A extends number}${infer Rest}`
  ? NumberToArray<Rest, [...R, DigitToArray<A>]>
  : R;

type DigitToArray<T extends number, R extends 0[] = []> = R["length"] extends T
  ? R
  : DigitToArray<T, [...R, 0]>;

type AddArray<
  A extends 0[][],
  B extends 0[][],
  R extends 0[][] = []
> = A extends [...infer AR extends 0[][], infer AL extends 0[]]
  ? B extends [...infer BR extends 0[][], infer BL extends 0[]]
    ? AddArray<AR, BR, [[...AL, ...BL], ...R]>
    : [...A, ...R]
  : [...B, ...R];

type ArrayOf10 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

type RegulateArrayNumber<T extends 0[][], R extends 0[][] = []> = T extends []
  ? R
  : T extends [
      ...infer Rest extends 0[][],
      infer L2 extends 0[],
      infer L1 extends 0[]
    ]
  ? L1 extends [...ArrayOf10, ...infer More extends 0[]]
    ? RegulateArrayNumber<[...Rest, [...L2, 0]], [More, ...R]>
    : RegulateArrayNumber<[...Rest, L2], [L1, ...R]>
  : T[0] extends [...ArrayOf10, ...infer More extends 0[]]
  ? RegulateArrayNumber<[[0]], [More, ...R]>
  : RegulateArrayNumber<[], [T[0], ...R]>;

type RegulatedArrayNumberToStringNumber<
  T extends 0[][],
  R extends string = ""
> = T extends [infer A extends 0[], ...infer Rest extends 0[][]]
  ? RegulatedArrayNumberToStringNumber<Rest, `${R}${A["length"]}`>
  : R;
```
