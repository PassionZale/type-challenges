# Combination

<BtnGroup 
	issue="https://tsch.js.org/8767/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32227"
/>

> 题目

Given an array of strings, do Permutation & Combination.
It's also useful for the prop types like video [controlsList](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList)

```ts
// expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
type Keys = Combination<["foo", "bar", "baz"]>;
```

> 解答

```ts
type Combination<
  T extends string[],
  U extends string = T[number],
  P extends string = U
> = U extends U
  ? U | `${U} ${Combination<T, Exclude<P, U>, Exclude<P, U>>}`
  : never;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/14157"
/>

> 全排列的问题已经做过几次了
>
> 由于入参是一个数组，我们没办法 `extends` 操作，需要转成联合类型，通过 `extends` 一次取一个
>
> 通过 `${I} ${Combination<[], Exclude<A, I>>}` 来递归剩余区域的内容，非常巧妙的通过 `I |` 来返回所有联合类型
>
> 但是你可以会这么写，会有很多的报错，大概就是 `A` 和 `U` 的类型不对
>
> ```ts
> type Combination<T extends string[], A = T[number], U = A> = U extends A
>   ? U | `${U} ${Combination<[], Exclude<A, U>>}`
>   : never;
> ```
>
> 我们需要通过 `infer` 来推一下 `U`
>
> ```ts
> // 答案
> type Combination<
>   T extends string[],
>   A = T[number],
>   U = A
> > = U extends infer I extends string
>   ? I | `${I} ${Combination<[], Exclude<A, I>>}`
>   : never;
> ```
