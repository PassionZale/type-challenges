# Percentage Parser

<BtnGroup 
  issue="https://tsch.js.org/1978/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/32007"
/>

> 题目

实现类型 `PercentageParser<T extends string>`。根据规则 `/^(\+|\-)?(\d*)?(\%)?$/` 匹配类型 T。

匹配的结果由三部分组成，分别是：[`正负号`, `数字`, `单位`]，如果没有匹配，则默认是空字符串。

例如：

```ts
type PString1 = "";
type PString2 = "+85%";
type PString3 = "-85%";
type PString4 = "85%";
type PString5 = "85";

type R1 = PercentageParser<PString1>; // expected ['', '', '']
type R2 = PercentageParser<PString2>; // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3>; // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4>; // expected ["", "85", "%"]
type R5 = PercentageParser<PString5>; // expected ["", "85", ""]
```

> 解答

通过 `infer` 解构推导是否为空字符串：

```ts
A extends `${infer First}${infer Rest}`
```

若为空字符串，则直接返回 `["", "", ""]`。

继续推导 `First` 是否是联合类型 `"+" | "-"`，若不是则返回 `[""]`。

`Rest` 是否是模板字符 `${infer S}%`，若不是则返回 `[""]`。

```ts
type PercentageParser<A extends string> =
  A extends `${infer First}${infer Rest}`
    ? First extends "+" | "-"
      ? Rest extends `${infer S}%`
        ? [First, S, "%"]
        : [First, Rest, ""]
      : A extends `${infer S}%`
      ? ["", S, "%"]
      : ["", A, ""]
    : ["", "", ""];
```
