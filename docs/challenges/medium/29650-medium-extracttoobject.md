# ExtractToObject

<BtnGroup 
	issue="https://tsch.js.org/29650/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32293"
/>

> 题目

Implement a type that extract prop value to the interface. The type takes the two arguments. The output should be an object with the prop values.
Prop value is object.

    For example

```ts
type Test = { id: "1"; myProp: { foo: "2" } };
type Result = ExtractToObject<Test, "myProp">; // expected to be { id: '1', foo: '2' }
```

> 解答

```ts
type Map<T> = {
  [K in keyof T]: T[K];
};

type ExtractToObject<T, U extends keyof T> = Map<Omit<T, U> & T[U]>;
```
