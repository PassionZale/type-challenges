# FindAll

<BtnGroup 
	issue="https://tsch.js.org/21104/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32276"
/>

> 题目

Given a pattern string P and a text string T, implement the type `FindAll<T, P>` that returns an Array that contains all indices (0-indexed) from T where P matches.

> 解答

```ts
type FindAll<
  T extends string,
  P extends string,
  L extends 0[] = []
> = P extends ""
  ? []
  : T extends `${string}${infer R}`
  ? [
      ...(T extends `${P}${string}` ? [L["length"]] : []),
      ...FindAll<R, P, [0, ...L]>
    ]
  : [];
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/30284"
/>

> This might look bit lengthy and probably isn't the smartest answer compared with the others but it should be east to understand. The main idea is to use the util type `StrLen` and `SliceStr` to get the same length characters of the target string type `P` from the original string type and check recursively.
>
> ```ts
> // Get the length of the given string
> type StrLen<
>   S extends string,
>   Len extends "🍎"[] = []
> > = S extends `${infer HEAD}${infer TAIL extends string}`
>   ? StrLen<TAIL, [...Len, "🍎"]>
>   : Len["length"];
>
> type Test2110401 = StrLen<"aa">; // 2
> ```
>
> ```ts
> // Slice and return the first <Len> characeters of the given string
> type SliceStr<
>   S extends string,
>   Len extends number,
>   RES extends string = ""
> > = S extends `${infer HEAD}${infer TAIL extends string}`
>   ? StrLen<RES> extends Len
>     ? RES
>     : SliceStr<TAIL, Len, `${RES}${HEAD}`>
>   : RES;
>
> type Test2110402 = SliceStr<"abcde", 2>; // ab
> ```
>
> ```ts
> type FindAll<
>   S extends string,
>   P extends string,
>   COUNT extends "🍎"[] = [],
>   RES extends number[] = []
> > = P extends ""
>   ? []
>   : S extends `${infer HEAD}${infer TAIL extends string}`
>   ? SliceStr<S, StrLen<P>> extends P
>     ? FindAll<TAIL, P, [...COUNT, "🍎"], [...RES, COUNT["length"]]>
>     : FindAll<TAIL, P, [...COUNT, "🍎"], RES>
>   : RES;
> ```
