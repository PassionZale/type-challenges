# 获取元组长度

<BtnGroup 
  issue="https://tsch.js.org/18/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31857"
/>

> 题目

创建一个`Length`泛型，这个泛型接受一个只读的元组，返回这个元组的长度。

例如：

```ts
type tesla = ["tesla", "model 3", "model X", "model Y"];
type spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT"
];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5
```

> 解答

```ts
type Length<T extends readonly any[]> = T['length']
```

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/2601"
/>

> ```ts
> type Length<T extends readonly any[]> = T extends { length: infer L }
>   ? L
>   : never;
> ```
