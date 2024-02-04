# MinusOne

<BtnGroup 
  issue="https://tsch.js.org/2257/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/32010"
/>

> 题目

给定一个正整数作为类型的参数，要求返回的类型是该数字减 1。

例如:

```ts
type Zero = MinusOne<1>; // 0
type FiftyFour = MinusOne<55>; // 54
```

> 解答

完全不会，看完答案后大受震撼。

可以直接查看精选。

```ts
type ParseInt<T extends string> = T extends `${infer Digit extends number}`
  ? Digit
  : never;
type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${ReverseString<Rest>}${First}`
  : "";
type RemoveLeadingZeros<S extends string> = S extends "0"
  ? S
  : S extends `${"0"}${infer R}`
  ? RemoveLeadingZeros<R>
  : S;
type InternalMinusOne<S extends string> =
  S extends `${infer Digit extends number}${infer Rest}`
    ? Digit extends 0
      ? `9${InternalMinusOne<Rest>}`
      : `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`
    : never;
type MinusOne<T extends number> = T extends 0
  ? -1
  : ParseInt<
      RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<`${T}`>>>>
    >;
```

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/13507"
/>

> Playground version needs to be set to v4.8.0+. (As of 24.07.2022 "v4.8.0" is still in beta, so select v4.8.0-beta)
>
> This solution makes use of the newly added feature to add extends constraints on infer types in conditional types. Microsoft devblog: [Improved Inference for infer Types in Template String Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-8-beta/#improved-inference-for-infer-types-in-template-string-types). Using this you can create a simple ParseInt Type, that parses strings to integers. Using that, you can do the entire "MinusOne" calculation as a string and parse it to an integer at the end. The limit for this method of "MinusOne" is the Javascript Integer limit 2^53 = 9007199254740991. As there is no massive recursion, it is also very fast.
>
> ```ts
> type ParseInt<T extends string> = T extends `${infer Digit extends number}`
>   ? Digit
>   : never;
> type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
>   ? `${ReverseString<Rest>}${First}`
>   : "";
> type RemoveLeadingZeros<S extends string> = S extends "0"
>   ? S
>   : S extends `${"0"}${infer R}`
>   ? RemoveLeadingZeros<R>
>   : S;
> type InternalMinusOne<S extends string> =
>   S extends `${infer Digit extends number}${infer Rest}`
>     ? Digit extends 0
>       ? `9${InternalMinusOne<Rest>}`
>       : `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`
>     : never;
> type MinusOne<T extends number> = ParseInt<
>   RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<`${T}`>>>>
> >;
> type test = MinusOne<9007199254740992>;
> ```
