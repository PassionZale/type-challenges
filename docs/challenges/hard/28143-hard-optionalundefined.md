# OptionalUndefined

<BtnGroup 
	issue="https://tsch.js.org/28143/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/28200"
/>

> 题目

Implement the util type `OptionalUndefined<T, Props>` that turns all the properties of `T` that can be `undefined`, into optional properties. In addition, a second -optional- generic `Props` can be passed to restrict the properties that can be altered.

```ts
OptionalUndefined<{ value: string | undefined; description: string }>;
// { value?: string | undefined; description: string }

OptionalUndefined<
  {
    value: string | undefined;
    description: string | undefined;
    author: string | undefined;
  },
  "description" | "author"
>;
// { value: string | undefined; description?: string | undefined, author?: string | undefined }
```

> 解答

```ts
type Merge<T> = {
  [K in keyof T]: T[K];
};

type OptionalUndefined<
  T,
  Props extends keyof T = keyof T,
  OptionsProps extends keyof T = Props extends keyof T
    ? undefined extends T[Props]
      ? Props
      : never
    : never
> = Merge<
  {
    [K in OptionsProps]?: T[K];
  } & {
    [K in Exclude<keyof T, OptionsProps>]: T[K];
  }
>;
```
