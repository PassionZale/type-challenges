# IsUnion

<BtnGroup 
  issue="https://tsch.js.org/1097/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31981"
/>

> 题目

Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

For example:

```ts
type case1 = IsUnion<string>; // false
type case2 = IsUnion<string | number>; // true
type case3 = IsUnion<[string | number]>; // false
```

> 解答

```ts
type IsUnionImpl<T, C extends T = T> = (
  T extends T ? (C extends T ? true : unknown) : never
) extends true
  ? false
  : true;

type IsUnion<T> = IsUnionImpl<T>;
```

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/1140"
/>

```ts
IsUnion<string|number>
=> IsUnionImpl<string|number, string|number>
=> (string|number extends string|number ? string|number extends string|number ? true : unknown : never) extends true ? false : true
=> (
  (string extends string|number ? string|number extends string ? true : unknown : never) |
  (number extends string|number ? string|number extends number ? true : unknown : never)
) extends true ? false : true
=> (
  (string|number extends string ? true : unknown) |
  (string|number extends number ? true : unknown)
) extends true ? false : true
=> (
  (
    (string extends string ? true : unknown) |
    (number extends string ? true : unknown)
  ) |
  (
    (string extends number ? true : unknown) |
    (number extends number ? true : unknown)
  )
) extends true ? false : true
=> (
  (
    (true) |
    (unknown)
  ) |
  (
    (unknown) |
    (true)
  )
) extends true ? false : true
=> (true|unknown) extends true ? false : true
=> (unknown) extends true ? false : true
=> true
```
