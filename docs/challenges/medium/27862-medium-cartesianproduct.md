# CartesianProduct

<BtnGroup 
	issue="https://tsch.js.org/27862/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32288"
/>

> 题目

Given 2 sets (unions), return its Cartesian product in a set of tuples, e.g.

```ts
CartesianProduct<1 | 2, "a" | "b">;
// [1, 'a'] | [2, 'a'] | [1, 'b'] | [2, 'b']
```

> 解答

```ts
// Union<2 | 3> -> [2] | [3]
type Union<T> = T extends T ? [T] : never;

// [1, ...Union<2 | 3>] -> [1, 2] | [1, 3]
type CartesianProduct<T, U> = T extends T ? [T, ...Union<U>] : never;
```
