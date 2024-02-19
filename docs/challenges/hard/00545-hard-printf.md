# printf

<BtnGroup 
	issue="https://tsch.js.org/545/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/2830"
/>

> 题目

Implement `Format<T extends string>` generic.

For example,

```ts
type FormatCase1 = Format<"%sabc">; // FormatCase1 : string => string
type FormatCase2 = Format<"%s%dabc">; // FormatCase2 : string => number => string
type FormatCase3 = Format<"sdabc">; // FormatCase3 :  string
type FormatCase4 = Format<"sd%abc">; // FormatCase4 :  string
```

> 解答

```ts
type MapDict = {
  s: string;
  d: number;
};

type Format<T extends string> = T extends `${string}%${infer M}${infer R}`
  ? M extends keyof MapDict
    ? (x: MapDict[M]) => Format<R>
    : Format<R>
  : string;
```
