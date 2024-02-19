# CheckRepeatedTuple

<BtnGroup 
	issue="https://tsch.js.org/27958/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32291"
/>

> 题目

判断一个元组类型中是否有相同的成员

For example:

```ts
type CheckRepeatedTuple<[1, 2, 3]>   // false
type CheckRepeatedTuple<[1, 2, 1]>   // true
```

> 解答

```ts
type CheckRepeatedTuple<T extends unknown[]> = T extends [infer L, ...infer R]
  ? L extends R[number]
    ? true
    : CheckRepeatedTuple<R>
  : false;
```
