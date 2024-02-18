# 获取数组的中间元素

<BtnGroup 
	issue="https://tsch.js.org/9896/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32264"
/>

> 题目

通过实现一个 `GetMiddleElement` 方法，获取数组的中间元素，用数组表示

> 如果数组的长度为奇数，则返回中间一个元素
> 如果数组的长度为偶数，则返回中间两个元素

```ts
  type simple1 = GetMiddleElement<[1, 2, 3, 4, 5]>, // 返回 [3]
  type simple2 = GetMiddleElement<[1, 2, 3, 4, 5, 6]> // 返回 [3, 4]
```

> 解答

```ts
type GetMiddleElement<T extends unknown[]> = T extends [
  infer F,
  ...infer R,
  infer L
]
  ? R extends []
    ? [F, L]
    : GetMiddleElement<R>
  : T;
```
