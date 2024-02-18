# Transpose

<BtnGroup 
	issue="https://tsch.js.org/25270/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32280"
/>

> 题目

The transpose of a matrix is an operator which flips a matrix over its diagonal; that is, it switches the row and column indices of the matrix A by producing another matrix, often denoted by A<sup>T</sup>.

```ts
type Matrix = Transpose<[[1]]>; // expected to be [[1]]
type Matrix1 = Transpose<[[1, 2], [3, 4]]>; // expected to be [[1, 3], [2, 4]]
type Matrix2 = Transpose<[[1, 2, 3], [4, 5, 6]]>; // expected to be [[1, 4], [2, 5], [3, 6]]
```

> 解答

```ts
type Transpose<M extends number[][], R = M["length"] extends 0 ? [] : M[0]> = {
  [X in keyof R]: {
    [Y in keyof M]: X extends keyof M[Y] ? M[Y][X] : never;
  };
};
```
