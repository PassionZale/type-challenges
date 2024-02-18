# Permutations of Tuple

<BtnGroup 
	issue="https://tsch.js.org/21220/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32278"
/>

> 题目

Given a generic tuple type `T extends unknown[]`, write a type which produces all permutations of `T` as a union.

For example:

```ts
PermutationsOfTuple<[1, number, unknown]>;
/**
 * Should return:
 * | [1, number, unknown]
 * | [1, unknown, number]
 * | [number, 1, unknown]
 * | [unknown, 1, number]
 * | [number, unknown, 1]
 * | [unknown, number ,1]
 */
```

> 解答

```ts
type Insert<
  T extends unknown[],
  U
> = 
T extends [infer F,...infer L]
  ? [F,U,...L] | [F,...Insert<L,U> ] 
  : [U]

type PermutationsOfTuple<
  T extends unknown[],
  R extends unknown[] = []
> = 
T extends [infer F,...infer L]?
  PermutationsOfTuple<L,Insert<R,F> | [F,...R] >
  :R
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/31765"
/>

> 提供一个解题思路
>
> 1. 如果入参数组中都是字面量类型的话，如 PermutationsOfTuple<[1, 2, 3]>,可以参考[296・Permutation ](https://github.com/type-challenges/type-challenges/blob/main/questions/00296-medium-permutation/README.zh-CN.md)
>
> ```ts
> type Permutation<T, K = T> = [T] extends [never]
>   ? []
>   : K extends K
>   ? [K, ...Permutation<Exclude<T, K>>]
>   : never;
> ```
>
> 2. 本题还需要处理 any、unkown 等，则会遇到一些麻烦，比如:
>
> ```ts
> type Test1 = [any, unknown, 1][number]; // any
> type Test2 = [1, 2, 3, 4][number]; // 1 | 2 | 3 | 4
> ```
>
> 其中 Test2 才是我们想要的结果。
>
> 3. 为了解决 2 中的问题，我们可以给数组中的每个元素提前包一层：
>
> ```ts
> type WrapArray<T extends any[]> = T extends [infer S, ...infer O]
>   ? [[S], ...WrapArray<O>]
>   : [];
> type Test1 = WrapArray<[any, unknown]>; // [[any], [unknown]]
> type Test2 = Test1[number]; // [unknown] | [any]
> ```
>
> 这样我们就可以通过联合类型的分布式计算迭代出每个元素了
>
> 4. 接着是 Exclude 的处理，我们不能直接从 [any] | [unknown]中剔除[unknown]，比如
>
> ```ts
> type Test = Exclude<[any] | [unknown], [unknown]>; // never
> ```
>
> 但是我们可以直接通过他原本的数组剔除其中的元素，比如从[[unknown], [any], 1]中剔除[unknown]得到其他元素[[any], 1]，代码如下:
>
> ```ts
> type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
>   T
> >() => T extends Y ? 1 : 2
>   ? true
>   : false;
> type MyExclued<T extends any[], U> = T extends [infer S, ...infer O]
>   ? MyEqual<S, U> extends true
>     ? MyExclued<O, U>
>     : [S, ...MyExclued<O, U>]
>   : [];
> type Test = MyExclued<[[unknown], [any], 1], [unknown]>; //[[any], 1]
> ```
>
> 5. 有了以上步骤的工具，那么我们就可以完全参照[296・Permutation ](https://github.com/type-challenges/type-challenges/blob/main/questions/00296-medium-permutation/README.zh-CN.md)的解法来处理这个问题了，整体代码如下：
>
> ```ts
> type WrapArray<T extends any[]> = T extends [infer S, ...infer O]
>   ? [[S], ...WrapArray<O>]
>   : [];
> type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
>   T
> >() => T extends Y ? 1 : 2
>   ? true
>   : false;
> type MyExclued<T extends any[], U> = T extends [infer S, ...infer O]
>   ? MyEqual<S, U> extends true
>     ? MyExclued<O, U>
>     : [S, ...MyExclued<O, U>]
>   : [];
> type MyPermutationsOfTuple<T extends any[], U = T[number], O = U> = [
>   U
> ] extends [never]
>   ? []
>   : U extends U
>   ? [
>       U extends any[] ? U[0] : never,
>       ...MyPermutationsOfTuple<MyExclued<T, U>>
>     ]
>   : [];
> type PermutationsOfTuple<
>   T extends unknown[],
>   U extends unknown[] = WrapArray<T>
> > = MyPermutationsOfTuple<U>;
> ```
>
> 最后别忘了一开始我们给数组中的每个元素包了一层数组，所以取值的时候取 U[0]即可。
