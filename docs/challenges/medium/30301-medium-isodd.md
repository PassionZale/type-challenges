# IsOdd

<BtnGroup 
	issue="https://tsch.js.org/30301/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32295"
/>

> 题目

return true is a number is odd

> 解答

```ts
type IsOdd<T extends number> = `${T}` extends `${number | ""}${
  | 1
  | 3
  | 5
  | 7
  | 9}`
  ? true
  : false;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/30324"
/>

> ```ts
> type Odd = 1 | 3 | 5 | 7 | 9;
> type Last<T extends string> = T extends `${any}${infer S}${infer R}`
>   ? Last<`${S}${R}`>
>   : T;
>
> type IsOdd<T extends number> = Last<`${T}`> extends `${Odd}` ? true : false;
>
> // other way
> // type Last<T extends string> = T extends `${any}${infer S}${infer R}` ? Last<`${S}${R}`> : T;
>
> // type IsOdd<T extends number, \_SWITCH extends boolean = false, \_Counter extends 1[] = []> =
> // `${_Counter[`length`]}` extends Last<`${T}`> ? \_SWITCH /_return_/ :
> // IsOdd<T, \_SWITCH extends true ? false : true, [..._Counter, 1]>;
>
> // simple way
> // type IsOdd<T extends number> = `${T}` extends `${number}${1 | 3 | 5 | 7 | 9}` ? true : false;
> ```
>
> simple way : [#30334 (comment)](https://github.com/type-challenges/type-challenges/issues/30334#issue-1929313282)
>
> ```
>
> ```
