# ObjectFromEntries

<BtnGroup 
	issue="https://tsch.js.org/2949/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/3382"
/>

> 题目

Implement the type version of `Object.fromEntries`

For example:

```typescript
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries =
  | ["name", string]
  | ["age", number]
  | ["locations", string[] | null];

type result = ObjectFromEntries<ModelEntries>; // expected to be Model
```

> 解答

```ts
type ObjectFromEntries<T extends [string, any]> = {
  [K in T[0]]: T extends [K, any] ? T[1] : never;
};
```
