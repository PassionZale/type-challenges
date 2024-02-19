# Split

<BtnGroup 
	issue="https://tsch.js.org/2822/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/32246"
/>

> 题目

The well known `split()` method splits a string into an array of substrings by looking for a separator, and returns the new array. The goal of this challenge is to split a string, by using a separator, but in the type system!

For example:

```ts
type result = Split<"Hi! How are you?", " ">; // should be ['Hi!', 'How', 'are', 'you?']
```

> 解答

```ts
type Split<S extends string, SEP extends string = never> = [SEP] extends [never]
  ? [S]
  : S extends `${infer F}${SEP}${infer L}`
  ? [F, ...Split<L, SEP>]
  : string extends S
  ? string[]
  : SEP extends ""
  ? []
  : [S];
```
