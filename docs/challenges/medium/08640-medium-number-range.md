# Number Range

<BtnGroup 
	issue="https://tsch.js.org/8640/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32226"
/>

> 题目

Sometimes we want to limit the range of numbers...
For examples.

```ts
type result = NumberRange<2, 9>; //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

> 解答

```ts
type NumberRange<
  L extends number,
  H extends number,
  Idx extends 1[] = L extends 0 ? [] : [1, 1],
  Res = never
> = Idx["length"] extends H
  ? H | Res
  : NumberRange<L, H, [...Idx, 1], Idx["length"] | Res>;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/9084"
/>

> [TypeScript PlayGround](https://www.typescriptlang.org/play?ts=4.7.0-dev.20220420#code/PQKgBA+l09YJoHsCuAnMBhRATApmACV1X1jKjBGAChqBLAOwBdiAzAQwGN8ARXV4gB4AKgD4wAb2pgwDXAA8mALjDCA3NLAkAzsgA2ysMgYBrBogDuDDQF9ajFqg7cwAJVy6DI8QpYNs2mB8AqiC7p5M3uJSMjr6hurUdtRMAJ4ADviu7AwA5riCADJgvrj+gQzIALYARsQANIQlimUBstV1qI0AktjyzX5tAIwA2gC6YAC8YMWl5WAADGAA-GDjYCojQ-VDY43hU7K4AG7E4tPBQpq98iMA5HpluUwAFncTc20Emqvh8YIEMAAHzcHlEmhU2TyBUKjQIjRGADpkTdGrsen17o88q93sDQdpweCUhl8AAxRChMSHYQjACiilQXEidzkijujRMuFSiFYqlEY1oaUyYAA4rgmAA5XwQACswjoVQ83kOmhkFKpPha80YIVUPzAGpVn0CuuI+pkqyN1JNYDN6GEButWsGpoYesdlsNlO8EKOp1QfrkAaDJ2IoZDJJF4qlMtlCwVSu0KumarFEulijlieVNu1bXtFpW6djWflitzLtabo9BpjmaY2Yrybzrrt7vNnuL9bjOZbVZ1HYddYzvebxvzNc7I9LjfLSYnbcLXdWPbLfcX1fbta9a7nG9bW+XM4bTYXh8HO+7o-X47EEfDMhUwcfG39r+fYcDT-f37fL7-T8Qx-ACH0DKN8D3CAACYFgTO9zjANMoPjA8BwLIci1XG853g890KnYddxwuU8MrAYj0wlcS1PVCELAhiQK-IVSTASUOmIKF8iKCj5kqWoGjcXi2n4zpEKg2CyOTLiYX2URRHuOIDHeFiRRYbQmEOdiBNQGTBAWNEABYFmJUBIHIWBVA8TSMHYbQPHMiy4CoegqnSSlNOFfAJDAOkAEdkHYPRGgZTJOE0mwwFYVBECqMA7gAAS8gBaTgXiC7F8m0YBkCYOg9G0O4IIJeIhkOEFoPxABmfFDPxWV8QANnxAB2fEAA58QATmKv4DEq6YQSWEEyoq3qPHiGrJk0Ib8VGsBKpBGqQTqkEGpBZqQTakFOpBLq5oWGawCGeahkW47luO1bjvW47NuO7bjt2479oqw6ZAq+boPO6DLug67oNu6D7ugx7oOe6DXrAKr3uq+aqvOqrLqq66qtuqr7qqx6queqqoeMo7DPmwzzsMy7DOuwzbsM+7DMewznsMqH4yO2V5tlc7ZUu2VrtlW7ZXu2VHtlZ7ZShxrYY2+bGvOxrLsa67Gtuxr7sax7GuexqoZayWwBa+aWvOlrLpa66Wtulr7pax6Wuelqofa3X2vm9rzvay72uu9rbva+72se9rnvaqGut1rr5q686usurrrq626uvurrHq656uqhoY4KOzPToWc7M8uzPrsz27M-uzPHsz57M4zzPs5OuazsbwuhmLoZS6GcuhkroZq6GDPYOz6DTu+ubfrH4vAbH8vQbH6vIbmmHs6q06EcXwuUcX0uMcXyuccXjOCa8sBODshzphGTRQtwcLBH8wK9EEbTOj06DGi60R9gmgwhnk+or-kGFSI98gpPw4rpHI3EDILU-iVfqf8AFALvgFUBz9OKQIKNA1uJkv4RCqggwUtBqBmScjAQ0aBXjmgAMosHSIEUhzkaCgE0OIKh6USBgB5GgMA2hEB6FynQRADBtAqBeEwJgdClDAGAEwbQaVEQACttCIkpLkYAvtjLAByNoCwr5xAADU6C4AsDwvhAihEiLAGIiRIjpGyPkUolRqA1EaIWMAXh-C8oWJYWAAAspSfAGB0p6Eyh4UR4jJF2LkS8RRyjVHUBctQIAA)
>
> ```ts
> interface Defer<T> {
>   next: T;
>   result: unknown;
> }
>
> interface Result<T> extends Defer<Result<T>> {
>   result: T;
> }
>
> type Range<
>   L extends number,
>   H extends number,
>   Idx extends 1[] = L extends 0 ? [] : [1, 1],
>   Res = never
> > = Defer<
>   Idx["length"] extends H
>     ? Result<H | Res>
>     : Range<L, H, [...Idx, 1], Idx["length"] | Res>
> >;
>
> type For<T> = T[Extract<"next", keyof T>];
>
> type GetNext_5Times<T> = For<T> extends infer T
>   ? For<T> extends infer T
>     ? For<T> extends infer T
>       ? For<T> extends infer T
>         ? For<T>
>         : never
>       : never
>     : never
>   : never;
>
> type GetNext_50Times<T> = GetNext_5Times<T> extends infer T
>   ? GetNext_5Times<T> extends infer T
>     ? GetNext_5Times<T> extends infer T
>       ? GetNext_5Times<T> extends infer T
>         ? GetNext_5Times<T> extends infer T
>           ? GetNext_5Times<T> extends infer T
>             ? GetNext_5Times<T> extends infer T
>               ? GetNext_5Times<T> extends infer T
>                 ? GetNext_5Times<T> extends infer T
>                   ? GetNext_5Times<T>
>                   : never
>                 : never
>               : never
>             : never
>           : never
>         : never
>       : never
>     : never
>   : never;
>
> type GetNext_200Times<T> = GetNext_50Times<T> extends infer T
>   ? GetNext_50Times<T> extends infer T
>     ? GetNext_50Times<T> extends infer T
>       ? GetNext_50Times<T>
>       : never
>     : never
>   : never;
>
> type NumberRange<L extends number, R extends number> = GetNext_200Times<
>   Range<L, R>
> >["result"];
> ```
>
> [How this work](https://github.com/type-challenges/type-challenges/issues/2563#issuecomment-1102038669)
