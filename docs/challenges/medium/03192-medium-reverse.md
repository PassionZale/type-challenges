# Reverse

<BtnGroup 
	issue="https://tsch.js.org/3192/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32080"
/>

> 题目

实现类型版本的数组反转 `Array.reverse`

例如：

```typescript
type a = Reverse<["a", "b"]>; // ['b', 'a']
type b = Reverse<["a", "b", "c"]>; // ['c', 'b', 'a']
```

> 解答

```ts
type Reverse<T extends unknown[]> = T extends [...infer Rest, infer Last]
  ? [Last, ...Reverse<Rest>]
  : T;
```
