# Assign

<BtnGroup 
	issue="https://tsch.js.org/9160/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/9277"
/>

> 题目

You have a target object and a source array of objects. You need to copy property from source to target, if it has the same property as the source, you should always keep the source property, and drop the target property. (Inspired by the `Object.assign` API)

### example

```ts
type Target = {
  a: "a";
};

type Origin1 = {
  b: "b";
};

// type Result = Assign<Target, [Origin1]>
type Result = {
  a: "a";
  b: "b";
};
```

```ts
type Target = {
  a: "a";
  d: {
    hi: "hi";
  };
};

type Origin1 = {
  a: "a1";
  b: "b";
};

type Origin2 = {
  b: "b2";
  c: "c";
};

type Answer = {
  a: "a1";
  b: "b2";
  c: "c";
  d: {
    hi: "hi";
  };
};
```

> 解答

```ts
type Merge<T> = {
  [K in keyof T]: T[K];
};

type Assign<T extends Record<string, unknown>, U extends any[]> = U extends [
  infer F,
  ...infer L
]
  ? F extends Record<string, unknown>
    ? Assign<Omit<T, keyof F> & F, L>
    : Assign<T, L>
  : Merge<T>;
```
