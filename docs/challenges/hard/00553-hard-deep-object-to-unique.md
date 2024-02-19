# Deep object to unique

<BtnGroup 
	issue="https://tsch.js.org/553/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/581"
/>

> 题目

TypeScript has structural type system, but sometimes you want a function to accept only some previously well-defined unique objects (as in the nominal type system), and not any objects that have the required fields.

Create a type that takes an object and makes it and all deeply nested objects in it unique, while preserving the string and numeric keys of all objects, and the values of all properties on these keys.

The original type and the resulting unique type must be mutually assignable, but not identical.

For example,

```ts
import { Equal } from "@type-challenges/utils";

type Foo = { foo: 2; bar: { 0: 1 }; baz: { 0: 1 } };

type UniqFoo = DeepObjectToUniq<Foo>;

declare let foo: Foo;
declare let uniqFoo: UniqFoo;

uniqFoo = foo; // ok
foo = uniqFoo; // ok

type T0 = Equal<UniqFoo, Foo>; // false
type T1 = UniqFoo["foo"]; // 2
type T2 = Equal<UniqFoo["bar"], UniqFoo["baz"]>; // false
type T3 = UniqFoo["bar"][0]; // 1
type T4 = Equal<keyof Foo & string, keyof UniqFoo & string>; // true
```

> 解答

```ts
type Key = string | number | symbol;

declare const KEY: unique symbol;

type DeepObjectToUniq<
  O extends object,
  Parent = O,
  Path extends readonly Key[] = []
> = {
  [K in keyof O]: O[K] extends object
    ? DeepObjectToUniq<O[K], O, [...Path, K]>
    : O[K];
} & {
  readonly [KEY]?: readonly [Parent, Path];
};
```