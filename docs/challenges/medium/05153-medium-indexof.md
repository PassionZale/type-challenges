# IndexOf

<BtnGroup 
	issue="https://tsch.js.org/5153/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32099"
/>

> 题目

Implement the type version of Array.indexOf, indexOf<T, U> takes an Array T, any U and returns the index of the first U in Array T.

```ts
type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
type Res1 = IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>; // expected to be 2
type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
```

> 解答

```ts
type IndexOf<T, U, Count extends any[] = []> = T extends [infer L, ...infer R]
  ? Equal<L, U> extends true
    ? Count["length"] extends 0
      ? "-1"
      : Count["length"]
    : IndexOf<R, U, [...Count, 0]>
  : -1;
```
