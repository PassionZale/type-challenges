# Inclusive Range

<BtnGroup 
	issue="https://tsch.js.org/734/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/6111"
/>

> 题目

Recursion depth in type system is one of the limitations of TypeScript, the number is around 45.

_We need to go deeper_. And we could go deeper.

In this challenge, you are given one lower boundary and one higher boundary, by which a range of natural numbers is inclusively sliced. You should develop a technique that enables you to do recursion deeper than the limitation, since both boundary vary from 0 to 200.

Note that when `Lower > Higher`, output an empty tuple.

> 解答

```ts
type InclusiveRange<
  Lower extends number,
  Higher extends number,
  C extends any[] = [],
  I = false,
  R extends number[] = []
> = I extends true
  ? C["length"] extends Higher
    ? [...R, Higher]
    : InclusiveRange<Lower, Higher, [...C, 1], true, [...R, C["length"]]>
  : C["length"] extends Lower
  ? InclusiveRange<Lower, Higher, C, true>
  : C["length"] extends Higher
  ? []
  : InclusiveRange<Lower, Higher, [...C, 1], false>;
```
