# FlattenDepth

<BtnGroup 
	issue="https://tsch.js.org/3243/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32083"
/>

> 题目

Recursively flatten array up to depth times.

For example:

```typescript
type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>; // [1, 2, 3, 4, [5]]. flattern 2 times
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
```

If the depth is provided, it's guaranteed to be positive integer.

> 解答

递归已经够费劲了，还要加上条件...

```ts
type FlattenDepth<
  T extends any[],
  C extends number = 1,
  U extends any[] = []
> = T extends [infer F, ...infer R]
  ? F extends any[]
    ? U["length"] extends C
      ? [F, ...FlattenDepth<R, C, U>]
      : [...FlattenDepth<F, C, [0, ...U]>, ...FlattenDepth<R, C, U>]
    : [F, ...FlattenDepth<R, C, U>]
  : T;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/15373"
/> > 题目要求写一个深度打平，并规定打平层数的类型。我们可以逐步简化问题，再慢慢添加条件来实现。我们先不考虑打平层数，只考虑深度打平。同样，写深度打平之前，我们先看看打平一层怎样实现：

> ```ts
> type FlattenOnce<T extends any[]> = T extends [infer F, ...infer R]
>   ? F extends any[]
>     ? [...F, ...FlattenOnce<R>]
>     : [F, ...FlattenOnce<R>]
>   : T;
> ```
>
> 那么深度打平，其实就是将打平的操作，进行递归。那么上面代码那里进行打平了呢？那就是 `...F`，因此我们只要递归这里就可以了：
>
> ```ts
> type FlattenDepth<T extends any[]> = T extends [infer F, ...infer R]
>   ? F extends any[]
>     ? [...FlattenDepth<F>, ...FlattenDepth<R>]
>     : [F, ...FlattenDepth<R>]
>   : T;
> ```
>
> 现在考虑下层数问题，ts 中需要比较具体的数字类型，通常都需要数组的 `length` 属性。那么我们可以增加一个数组类型参数 `U`，每次打平向它里面添加一个元素来达到 ”+1“ 的目的。然后每次递归时，判断层数和它的 `length` 是否一致，如果一致，说明打平层数够了，直接返回本身即可；否则继续递归。
>
> ```ts
> type FlattenDepth<
>   T extends any[],
>   S extends number = 1,
>   U extends any[] = []
> > = U["length"] extends S
>   ? T
>   : T extends [infer F, ...infer R]
>   ? F extends any[]
>     ? [...FlattenDepth<F, S, [...U, 1]>, ...FlattenDepth<R, S, U>]
>     : [F, ...FlattenDepth<R, S, U>]
>   : T;
> ```
>
> 需要注意，只有 `...F` 的部分向 `U` 中添加了元素，进行了 ”+1“，因为只有这部分是**真正进行打平操作的**，而剩余参数 `R` 部分的递归，**并没有进行打平**，只是继续向后传递参数，因此这部分不 ”+1“。
