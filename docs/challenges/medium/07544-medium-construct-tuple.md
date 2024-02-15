# Construct Tuple

<BtnGroup 
	issue="https://tsch.js.org/7544/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32225"
/>

> 题目

构造一个给定长度的元组。

例如

```ts
type result = ConstructTuple<2>; // 期望得到 [unknown, unkonwn]
```

> 解答

```ts
type ConstructTuple<
  L extends number,
  U extends unknown[] = []
> = U["length"] extends L ? U : ConstructTuple<L, [...U, unknown]>;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/14153"
/> > 这题非常有意思，如果不追求完美的话，非常简单，我们只需要用 `infer` + 递归 就可以了

> ```ts
> type ConstructTuple<
>   L extends number,
>   U extends unknown[] = []
> > = U["length"] extends L ? U : ConstructTuple<L, [...U, unknown]>;
> ```
>
> 但是 TS 中递归最多只能 1000 次，因此入参到了 `1000` 就会挂掉，测试用例最后有一个边界 case 就是 1000，那就说明有其他方法实现
>
> 既然没有办法递归这么多次，那么我们可以换个思路，怎么把递归次数降下来
>
> 我们想想 `9999 = 9 * 100 + 99 * 10 + 9 * 10 + 9`,那么我们是不是可以通过这样的方法来递归呢
>
> 每次取数字的第一位，返回该长度的数组，例如 `23`,第一次就返回 `[unknown, unknown]`,
>
> 递归第二个数字的时候，我们需要**把上一次的`数组长度 * 10`**，怎么实现呢
>
> ```ts
> [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T];
> ```
>
> 我们可以接受数组 T，展开 10 次，这样就实现了，那么本次的数字（3）就是在它后面加几个 `unknown`
>
> ```ts
> [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, unknown, unknown, unknown],
> ```
>
> 这样第一次 返回的 `T` 是 `[unknown, unknown]`,第二次解构后，就会得到 20 个，再加上 3 个本次的，`length` 就达到了，递归的次数也大大的缩减了
>
> 那么我们就需要构造 `0-9` 数字对应的展开搭配，就有了下面的答案，其中 `N<Count>[keyof N & F]` 中 `[keyof N & F]` 就是数字，例如 `9` 就是 `N<Count>[9]`,也就对应 `N['9']`
>
> ```ts
> // 本题答案
> type ConstructTuple<
>   L extends number,
>   O extends string = `${L}`,
>   Count extends unknown[] = []
> > = O extends `${infer F}${infer R}`
>   ? ConstructTuple<L, R, N<Count>[keyof N & F]>
>   : Count;
>
> type N<T extends unknown[] = []> = {
>   "0": [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T];
>   "1": [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, unknown];
>   "2": [
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     unknown,
>     unknown
>   ];
>   "3": [
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     unknown,
>     unknown,
>     unknown
>   ];
>   "4": [
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     unknown,
>     unknown,
>     unknown,
>     unknown
>   ];
>   "5": [
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown
>   ];
>   "6": [
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown
>   ];
>   "7": [
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown
>   ];
>   "8": [
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown
>   ];
>   "9": [
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     ...T,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown,
>     unknown
>   ];
> };
> ```
