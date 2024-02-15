# Join

<BtnGroup 
	issue="https://tsch.js.org/5310/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32221"
/>

> 题目

Implement the type version of Array.join, Join<T, U> takes an Array T, string or number U and returns the Array T with U stitching up.

```ts
type Res = Join<["a", "p", "p", "l", "e"], "-">; // expected to be 'a-p-p-l-e'
type Res1 = Join<["Hello", "World"], " ">; // expected to be 'Hello World'
type Res2 = Join<["2", "2", "2"], 1>; // expected to be '21212'
type Res3 = Join<["o"], "u">; // expected to be 'o'
```

> 解答

```ts
type Join<T extends unknown[], U extends string | number> = T extends [
  infer F extends string,
  ...infer R
]
  ? R["length"] extends 0
    ? `${F}`
    : `${F}${U}${Join<R, U>}`
  : "";
```
