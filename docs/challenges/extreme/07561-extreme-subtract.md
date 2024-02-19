# Subtract

<BtnGroup 
	issue="https://tsch.js.org/7561/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/7680"
/>

> 题目

Implement the type Subtraction that is `-` in Javascript by using BuildTuple.

If the minuend is less than the subtrahend, it should be `never`.

It's a simple version.

For example

```ts
Subtract<2, 1>; // expect to be 1
Subtract<1, 2>; // expect to be never
```

> 解答

```ts
type ConstructTuple<
  L extends number,
  R extends unknown[] = []
> = R["length"] extends L ? R : ConstructTuple<L, [...R, unknown]>;

// M => minuend, S => subtrahend
type Subtract<M extends number, S extends number> = ConstructTuple<M> extends [
  ...subtrahend: ConstructTuple<S>,
  ...rest: infer Rest
]
  ? Rest["length"]
  : never;
```
