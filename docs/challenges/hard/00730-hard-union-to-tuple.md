# Union to Tuple

<BtnGroup 
	issue="https://tsch.js.org/730/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/10191"
/>

> 题目

Implement a type, `UnionToTuple`, that converts a union to a tuple.

As we know, union is an unordered structure, but tuple is an ordered, which implies that we are not supposed to preassume any order will be preserved between terms of one union, when unions are created or transformed.

Hence in this challenge, **any permutation of the elements in the output tuple is acceptable**.

Your type should resolve to one of the following two types, but **_NOT_** a union of them!

```ts
UnionToTuple<1>; // [1], and correct
UnionToTuple<"any" | "a">; // ['any','a'], and correct
```

or

```ts
UnionToTuple<"any" | "a">; // ['a','any'], and correct
```

It shouldn't be a union of all acceptable tuples...

```ts
UnionToTuple<"any" | "a">; // ['a','any'] | ['any','a'], which is incorrect
```

And a union could collapes, which means some types could absorb (or be absorbed by) others and there is no way to prevent this absorption. See the following examples:

```ts
Equal<UnionToTuple<any | "a">, UnionToTuple<any>>; // will always be a true
Equal<UnionToTuple<unknown | "a">, UnionToTuple<unknown>>; // will always be a true
Equal<UnionToTuple<never | "a">, UnionToTuple<"a">>; // will always be a true
Equal<UnionToTuple<"a" | "a" | "a">, UnionToTuple<"a">>; // will always be a true
```

> 解答

```ts
type UnionToIntersectionFn<U> = (
  U extends unknown ? (k: () => U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type GetUnionLast<U> = UnionToIntersectionFn<U> extends () => infer I
  ? I
  : never;

type Prepend<Tuple extends unknown[], First> = [First, ...Tuple];

type UnionToTuple<
  Union,
  T extends unknown[] = [],
  Last = GetUnionLast<Union>
> = [Union] extends [never]
  ? T
  : UnionToTuple<Exclude<Union, Last>, Prepend<T, Last>>;
```