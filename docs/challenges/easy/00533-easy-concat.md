# Concat

<BtnGroup 
  issue="https://tsch.js.org/53/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31862"
/>

> 题目

在类型系统里实现 JavaScript 内置的 `Array.concat` 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

例如：

```ts
type Result = Concat<[1], [2]>; // expected to be [1, 2]
```

> 解答

```ts
type Concat<T extends any[], U extends any[]> = [...T, ...U];
```

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/538#issuecomment-1811368590"
/>

> ```ts
> type Tuple = readonly unknown[];
>
> type Concat<T extends Tuple, U extends Tuple> = [...T, ...U];
> ```
