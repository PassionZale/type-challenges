# Object Key Paths

<BtnGroup 
	issue="https://tsch.js.org/7258/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/22298"
/>

> 题目

Get all possible paths that could be called by [\_.get](https://lodash.com/docs/4.17.15#get) (a lodash function) to get the value of an object

```typescript
type T1 = ObjectKeyPaths<{ name: string; age: number }>; // expected to be 'name' | 'age'
type T2 = ObjectKeyPaths<{
  refCount: number;
  person: { name: string; age: number };
}>; // expected to be 'refCount' | 'person' | 'person.name' | 'person.age'
type T3 = ObjectKeyPaths<{ books: [{ name: string; price: number }] }>; // expected to be the superset of 'books' | 'books.0' | 'books[0]' | 'books.[0]' | 'books.0.name' | 'books.0.price' | 'books.length' | 'books.find'
```

> 解答

```ts
type Keys<O, IsTop, K extends string | number> = IsTop extends true
  ? K | (O extends unknown[] ? `[${K}]` : never)
  : `.${K}` | (O extends unknown[] ? `[${K}]` | `.[${K}]` : never);

type ObjectKeyPaths<T, IsTop = true, K extends keyof T = keyof T> = K extends
  | string
  | number
  ? `${Keys<T, IsTop, K>}${
      | ""
      | (T[K] extends object ? ObjectKeyPaths<T[K], false> : "")}`
  : never;
```
