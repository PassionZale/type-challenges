# Typed Get

<BtnGroup 
	issue="https://tsch.js.org/270/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/397"
/>

> 题目

The [`get` function in lodash](https://lodash.com/docs/4.17.15#get) is a quite convenient helper for accessing nested values in JavaScript. However, when we come to TypeScript, using functions like this will make you lose the type information. With TS 4.1's upcoming [Template Literal Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#template-literal-types) feature, properly typing `get` becomes possible. Can you implement it?

For example,

```ts
type Data = {
  foo: {
    bar: {
      value: "foobar";
      count: 6;
    };
    included: true;
  };
  hello: "world";
};

type A = Get<Data, "hello">; // 'world'
type B = Get<Data, "foo.bar.count">; // 6
type C = Get<Data, "foo.bar">; // { value: 'foobar', count: 6 }
```

Accessing arrays is not required in this challenge.

> 解答

```ts
type Get<T, K> = K extends keyof T
  ? T[K]
  : K extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? Get<T[First], Rest>
    : never
  : never;
```
