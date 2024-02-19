# DeepPick

<BtnGroup 
	issue="https://tsch.js.org/956/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/3294"
/>

> 题目

Implement a type DeepPick, that extends Utility types `Pick`.
A type takes two arguments.

For example:

```ts
type obj = {
  name: "hoge";
  age: 20;
  friend: {
    name: "fuga";
    age: 30;
    family: {
      name: "baz";
      age: 1;
    };
  };
};

type T1 = DeepPick<obj, "name">; // { name : 'hoge' }
type T2 = DeepPick<obj, "name" | "friend.name">; // { name : 'hoge' } & { friend: { name: 'fuga' }}
type T3 = DeepPick<obj, "name" | "friend.name" | "friend.family.name">; // { name : 'hoge' } &  { friend: { name: 'fuga' }} & { friend: { family: { name: 'baz' }}}
```

> 解答

```ts
type DeepPick<T extends Record<string, any>, U extends string> = (
  U extends string
    ? U extends `${infer F}.${infer R}`
      ? (arg: {
          [K in F]: DeepPick<T[F], R>;
        }) => void
      : U extends keyof T
      ? (arg: Pick<T, U>) => void
      : (arg: unknown) => void
    : never
) extends (arg: infer Z) => void
  ? Z
  : never;
```
