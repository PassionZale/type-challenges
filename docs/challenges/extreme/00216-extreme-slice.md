# Slice

<BtnGroup 
	issue="https://tsch.js.org/216/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/22110"
/>

> 题目

Implement the JavaScript `Array.slice` function in the type system. `Slice<Arr, Start, End>` takes the three argument. The output should be a subarray of `Arr` from index `Start` to `End`. Indexes with negative numbers should be counted from reversely.

For example

```ts
type Arr = [1, 2, 3, 4, 5];
type Result = Slice<Arr, 2, 4>; // expected to be [3, 4]
```

> 解答

```ts
// if N is negative, convert it to its positive counterpart by the Arr
type ToPositive<
  N extends number,
  Arr extends unknown[]
> = `${N}` extends `-${infer P extends number}` ? Slice<Arr, P>["length"] : N;

// get the initial N items of Arr
type InitialN<
  Arr extends unknown[],
  N extends number,
  _Acc extends unknown[] = []
> = _Acc["length"] extends N | Arr["length"]
  ? _Acc
  : InitialN<Arr, N, [..._Acc, Arr[_Acc["length"]]]>;

type Slice<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr["length"]
> = InitialN<Arr, ToPositive<End, Arr>> extends [
  ...InitialN<Arr, ToPositive<Start, Arr>>,
  ...infer Rest
]
  ? Rest
  : [];
```
