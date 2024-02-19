# C-printf Parser

<BtnGroup 
	issue="https://tsch.js.org/147/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/7074"
/>

> 题目

There is a function in C language: `printf`. This function allows us to print something with formatting. Like this:

```c
printf("The result is %d.", 42);
```

This challenge requires you to parse the input string and extract the format placeholders like `%d` and `%f`. For example, if the input string is `"The result is %d."`, the parsed result is a tuple `['dec']`.

Here is the mapping:

```typescript
type ControlsMap = {
  c: "char";
  s: "string";
  d: "dec";
  o: "oct";
  h: "hex";
  f: "float";
  p: "pointer";
};
```

> 解答

```ts
// your answers
type ControlsMap = {
  c: "char";
  s: "string";
  d: "dec";
  o: "oct";
  h: "hex";
  f: "float";
  p: "pointer";
};

type ParsePrintFormat<
  S extends string,
  ResultArr extends string[] = []
> = S extends `${string}%${infer Letter}${infer Rest}`
  ? Letter extends keyof ControlsMap
    ? ParsePrintFormat<Rest, [...ResultArr, ControlsMap[Letter]]>
    : ParsePrintFormat<Rest, ResultArr>
  : ResultArr;
```
