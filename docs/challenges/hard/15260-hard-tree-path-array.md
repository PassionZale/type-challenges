# Tree path array

<BtnGroup 
	issue="https://tsch.js.org/15260/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/22354"
/>

> 题目

Create a type `Path` that represents validates a possible path of a tree under the form of an array.

Related challenges:

- [Object key path](https://github.com/type-challenges/type-challenges/blob/main/questions/07258-hard-object-key-paths/README.md)

```ts
declare const example: {
  foo: {
    bar: {
      a: string;
    };
    baz: {
      b: number;
      c: number;
    };
  };
};

// Possible solutions:
// []
// ['foo']
// ['foo', 'bar']
// ['foo', 'bar', 'a']
// ['foo', 'baz']
// ['foo', 'baz', 'b']
// ['foo', 'baz', 'c']
```

> 解答

```ts
type Path<T, P extends PropertyKey[] = []> =
  | P
  | { [K in keyof T]: Path<T[K], [...P, K]> }[keyof T];
```
