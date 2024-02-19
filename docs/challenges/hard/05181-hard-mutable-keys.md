# Mutable Keys

<BtnGroup 
	issue="https://tsch.js.org/5181/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/5221"
/>

> 题目

Implement the advanced util type `MutableKeys<T>`, which picks all the mutable (not readonly) keys into a union.

For example:

```ts
type Keys = MutableKeys<{ readonly foo: string; bar: number }>;
// expected to be “bar”
```

> 解答

```ts
type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type MutableKeys<T> = keyof {
  [Key in keyof T as MyEqual<Pick<T, Key>, Readonly<Pick<T, Key>>> extends true
    ? never
    : Key]: any;
};
```
