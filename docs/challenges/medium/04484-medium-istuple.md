# IsTuple

<BtnGroup 
	issue="https://tsch.js.org/4484/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32093"
/>

> 题目

Implement a type `IsTuple`, which takes an input type `T` and returns whether `T` is tuple type.

For example:

```typescript
type case1 = IsTuple<[number]>; // true
type case2 = IsTuple<readonly [number]>; // true
type case3 = IsTuple<number[]>; // false
```

> 解答

元组和数组的区别在于，元组的长度是有限的，数组是无限的，也就是他们的 `['length']` 返回的结果是不同的：

- 元组返回的是数字
- 数组返回的是 `number`

```ts
type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
  ? number extends T["length"]
    ? false
    : true
  : false;
```
