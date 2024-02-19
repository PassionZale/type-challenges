# Public Type

<BtnGroup 
	issue="https://tsch.js.org/28333/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32292"
/>

> 题目

Remove the key starting with `_` from given type `T`.

> 解答

```ts
type PublicType<T extends object> = {
  [P in keyof T as P extends `_${infer _}` ? never : P]: T[P];
};
```
