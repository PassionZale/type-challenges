# Subsequence

<BtnGroup 
	issue="https://tsch.js.org/8987/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32228"
/>

> 题目

Given an array of unique elements, return all possible subsequences.

A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.

For example:

```typescript
type A = Subsequence<[1, 2]>; // [] | [1] | [2] | [1, 2]
```

> 解答

```ts
[a,...[b] | [c]] => [a,b] | [a,c]
```

```ts
[...Subsequence<Rest>] | [One, ...Subsequence<Rest>]
[1] => [] | [1,...[]] => [] | [1]
[1,2] => [] | [2] | [[] | [1] ,...[] | [2]] => [] | [2] | [1] | [1,2]
[1,2,3] => [] | [3] | [[] | [2] | [1] | [1,2],...[] | [3]] => [] | [3] | [2] | [1] | [1,2] | [2,3] | [1,3] | [1,2,3]
```

```ts
type Subsequence<T> = T extends [infer One, ...infer Rest]
  ? [One] | [...Subsequence<Rest>] | [One, ...Subsequence<Rest>]
  : [];
```
