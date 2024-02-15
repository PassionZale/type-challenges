# LastIndexOf

<BtnGroup 
	issue="https://tsch.js.org/5317/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32222"
/>

> 题目

实现类型版本的 `Array.lastIndexOf`,

`LastIndexOf<T, U>` 接受数组 `T`, any 类型 `U`,

如果 `U` 存在于 `T` 中, 返回 `U` 在数组 `T` 中最后一个位置的索引,

不存在则返回 `-1`

For example:

```typescript
type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2>; // 3
type Res2 = LastIndexOf<[0, 0, 0], 2>; // -1
```

> 解答

```ts
type LastIndexOf<T, U> = T extends [...infer R, infer L]
  ? Equal<L, U> extends true
    ? R["length"]
    : LastIndexOf<R, U>
  : -1;
```
