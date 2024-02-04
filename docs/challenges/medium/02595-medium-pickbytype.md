# PickByType

<BtnGroup 
  issue="https://tsch.js.org/2595/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/32011"
/>

> 题目

From `T`, pick a set of properties whose type are assignable to `U`.

For Example

```typescript
type OnlyBoolean = PickByType<
  {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  },
  boolean
>; // { isReadonly: boolean; isEnable: boolean; }
```

> 解答

```ts
type PickByType<T, U> = {
  [Key in keyof T as T[Key] extends U ? Key : never]: T[Key];
};
```
