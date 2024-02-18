# 组合键类型 Combination key type

<BtnGroup 
	issue="https://tsch.js.org/21106/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32277"
/>

> 题目

1. 把多个修饰键两两组合，但不可以出现相同的修饰键组合。
2. 提供的 `ModifierKeys` 中，前面的值比后面的值高，即 `cmd ctrl` 是可以的，但 `ctrl cmd` 是不允许的。

> 解答

```ts
// never会被联合类型过滤，所以U的默认值给到never
type Combs<T extends string[], U = never> = T extends [
  infer F extends string,
  ...infer R extends string[]
]
  ? // 当遍历到最后一个元素时，R为空数组，空数组[number]为never
    // 此时`${F} ${R[number]}`为`${最后一个元素类型} ${never}`，与never组成模板字符串类型时会返回never
    Combs<R, U | `${F} ${R[number]}`>
  : U;
```
