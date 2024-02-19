# Deep Omit

<BtnGroup 
	issue="https://tsch.js.org/29785/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32294"
/>

> 题目

Implement a type`DeepOmit`, Like Utility types [Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys), A type takes two arguments.

For example:

```ts
type obj = {
  person: {
    name: string;
    age: {
      value: number;
    };
  };
};

type test1 = DeepOmit<obj, "person">; // {}
type test2 = DeepOmit<obj, "person.name">; // { person: { age: { value: number } } }
type test3 = DeepOmit<obj, "name">; // { person: { name: string; age: { value: number } } }
type test4 = DeepOmit<obj, "person.age.value">; // { person: { name: string; age: {} } }
```

> 解答

```ts
type DeepOmit<T, Paths> = Paths extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? {
        [P in keyof T]: P extends K ? DeepOmit<T[P], R> : T[P];
      }
    : T
  : {
      [K in keyof T as K extends Paths ? never : K]: T[K];
    };
```
