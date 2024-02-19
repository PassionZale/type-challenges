# Multiply

<BtnGroup 
	issue="https://tsch.js.org/517/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/5814"
/>

> 题目

**This challenge continues from [476 - Sum](https://tsch.js.org/476), it is recommended that you finish that one first, and modify your code based on it to start this challenge.**

Implement a type `Multiply<A, B>` that multiplies two non-negative integers and returns their product as a string. Numbers can be specified as string, number, or bigint.

For example,

```ts
type T0 = Multiply<2, 3>; // '6'
type T1 = Multiply<3, "5">; // '15'
type T2 = Multiply<"4", 10>; // '40'
type T3 = Multiply<0, 16>; // '0'
type T4 = Multiply<"13", "21">; // '273'
type T5 = Multiply<"43423", 321543n>; // '13962361689'
```

> 解答

```ts
type Reverse<A extends string | number | bigint> =
  `${A}` extends `${infer AH}${infer AT}` ? `${Reverse<AT>}${AH}` : "";

type DigsNext = {
  "0": "1";
  "1": "2";
  "2": "3";
  "3": "4";
  "4": "5";
  "5": "6";
  "6": "7";
  "7": "8";
  "8": "9";
};
type DigsPrev = { [K in keyof DigsNext as DigsNext[K]]: K };

type AddOne<A> = A extends `${infer AH}${infer AT}`
  ? AH extends "9"
    ? `0${AddOne<AT>}`
    : `${DigsNext[AH & keyof DigsNext]}${AT}`
  : "1";

type SubOne<A> = A extends `${infer AH}${infer AT}`
  ? AH extends "0"
    ? `9${SubOne<AT>}`
    : `${DigsPrev[AH & keyof DigsPrev]}${AT}`
  : never;

type Add<A, B> = A extends `${infer AH}${infer AT}`
  ? B extends `${infer BH}${infer BT}`
    ? BH extends "0"
      ? `${AH}${Add<AT, BT>}`
      : Add<AddOne<A>, SubOne<B>>
    : A
  : B;

type Mul<A extends string, B extends string, R = "0"> = A extends "0"
  ? R
  : B extends "0"
  ? R
  : A extends `${infer AH}${infer AT}`
  ? AH extends "0"
    ? Mul<AT, `0${B}`, R>
    : Mul<SubOne<A>, B, Add<R, B>>
  : R;

type Multiply<
  A extends string | number | bigint,
  B extends string | number | bigint
> = Reverse<Mul<Reverse<A>, Reverse<B>>>;
```
