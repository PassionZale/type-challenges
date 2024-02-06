# OmitByType

<BtnGroup 
	issue="https://tsch.js.org/2852/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/UPDATE_HERE_AFTER_SUBMIT_ANSWER"
/>

> 题目

From `T`, pick a set of properties whose type are not assignable to `U`.

For Example

```typescript
type OmitBoolean = OmitByType<
  {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  },
  boolean
>; // { name: string; count: number }
```

> 解答

```ts
type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P];
};
```
